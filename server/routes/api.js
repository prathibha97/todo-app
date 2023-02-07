import express from 'express'
import authRouter from './auth.routes.js'
import todoRouter from './todo.routes.js'

const api = express.Router()

api.use('/todos', todoRouter)
api.use('/auth', authRouter)

export default api