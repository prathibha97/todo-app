import pkg from 'pg'
const {Pool} = pkg

import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "todoapp",
})

export default pool