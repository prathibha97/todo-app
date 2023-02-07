import { v4 as uuid } from 'uuid'
import pool from '../services/db.js'

export const getTodosByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
    res.status(200).json(todos.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const createTodo = async (req, res) => {
  const { user_email, title, progress, date } = req.body
  const id = uuid()
  try {
    const newTodo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date])
    res.status(201).json(newTodo.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const editTodo = async (req, res) => {
  const { user_email, title, progress, date } = req.body
  const { id } = req.params
  try {
    const editTodo = await pool.query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;`, [user_email, title, progress, date, id])
    res.status(200).json(editTodo.rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteTodo = async (req, res) => {
  const { id } = req.params
  try {
    await pool.query(`DELETE FROM todos WHERE id = $1`, [id])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}