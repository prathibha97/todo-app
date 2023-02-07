import http from 'http'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

const port = process.env.PORT || 5001

const server = http.createServer(app)

const startServer = () => {
  server.listen(port, ()=>{
    console.log('listening on port ' + port)
  })
}

startServer()