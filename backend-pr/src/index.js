import 'dotenv/config'
import express from 'express'
import Db from './db/db.js'
import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { corsConfig } from './config/cors.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 0
app.use(cors(corsConfig))
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/movies', movieRoutes)
app.use('/users', userRoutes)

const startServer = async () => {
  try {
    await Db._connect()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
  }
}

startServer()
