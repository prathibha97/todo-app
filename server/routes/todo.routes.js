import express from 'express'
import { createTodo, deleteTodo, editTodo, getTodosByEmail } from '../controllers/todo.controller.js'

const todoRouter = express.Router()

todoRouter.get('/:email', getTodosByEmail)
todoRouter.post('/', createTodo)
todoRouter.put('/:id', editTodo)
todoRouter.delete('/:id', deleteTodo)


export default todoRouter