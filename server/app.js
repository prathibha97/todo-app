import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import api from './routes/api.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', api)
export default app