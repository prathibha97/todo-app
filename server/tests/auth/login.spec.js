const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const login = require('../../controllers/auth.controller')

jest.mock('bcrypt', () => {
  return {
    compare: jest.fn().mockResolvedValue(true)
  }
})

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn().mockReturnValue('token')
  }
})

describe('login', () => {
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

  it('returns a 200 response with the email and token if login is successful', async () => {
    const pool = {
      query: jest.fn().mockResolvedValue({
        rows: [{ email: 'test@email.com', hashed_password: 'hashedPassword' }]
      })
    }
    await login(req, res, pool)

    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedPassword')
    expect(jwt.sign).toHaveBeenCalledWith({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1hr' })
    expect(res.json).toHaveBeenCalledWith({ email: req.body.email, token: 'token' })
  })

  it('returns a 500 response with an error message if there is an error', async () => {
    const pool = {
      query: jest.fn().mockRejectedValue({ message: 'error message' })
    }
    await login(req, res, pool)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'error message' })
  })

  it('returns a 400 response with a message if the user does not exist', async () => {
    const pool = {
      query: jest.fn().mockResolvedValue({ rows: [] })
    }
    await login(req, res, pool)

    expect(res.json).toHaveBeenCalledWith({ message: 'user does not exist' })
  })

  it('returns a 400 response with a message if the password is incorrect', async () => {
    bcrypt.compare.mockResolvedValue(false)
    const pool = {
      query: jest.fn().mockResolvedValue({
        rows: [{ email: 'test@email.com', hashed_password: 'hashedPassword' }]
      })
    }
    await login(req, res, pool)

    expect(res.json).toHaveBeenCalledWith({ message: 'Entered password is incorrect'})
  })
})
