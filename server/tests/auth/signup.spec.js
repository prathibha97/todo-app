const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const signup = require('../../controllers/auth.controller')

jest.mock('bcrypt', () => {
  return {
    genSalt: jest.fn().mockResolvedValue('salt'),
    hash: jest.fn().mockResolvedValue('hashedPassword')
  }
})

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn().mockReturnValue('token')
  }
})

describe('signup', () => {
  let req
  let res

  beforeEach(() => {
    req = {
      body: {
        email: 'test@email.com',
        password: 'password'
      }
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('hashes the password and returns a 201 response with the email and token', async () => {
    const pool = {
      query: jest.fn().mockResolvedValue({})
    }
    await signup(req, res, pool)

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10)
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 'salt')
    expect(jwt.sign).toHaveBeenCalledWith({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1hr' })
    expect(pool.query).toHaveBeenCalledWith(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [req.body.email, 'hashedPassword'])
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ email: req.body.email, token: 'token' })
  })

  it('returns a 500 response with an error message', async () => {
    const pool = {
      query: jest.fn().mockRejectedValue({ detail: 'error message' })
    }
    await signup(req, res, pool)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'error message' })
  })
})
