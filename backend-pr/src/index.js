import 'dotenv/config'
import express from 'express'
import Db from './db/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const port = process.env.PORT || 0

app.use(express.json())
app.use('/auth', authRoutes)

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
