import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../services/db.js'


export const signup = async (req, res) => {
  const { email, password } = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  try {
    const signup = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword])
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1hr' })
    res.status(201).json({ email, token })
  } catch (err) {
    res.status(500).json({ message: err.detail })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
    if (users.rows.length === 0) return res.json({ message: 'user does not exist' })

    const isMatched = await bcrypt.compare(password, users.rows[0].hashed_password)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1hr' })

    if (isMatched) {
      res.json({ 'email': users.rows[0].email, token })
    } else {
      res.json({ message: 'login failed' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}