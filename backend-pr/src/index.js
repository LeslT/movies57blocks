import 'dotenv/config'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { corsConfig } from './config/cors.js'
import cors from 'cors'

const app = express()

app.use(cors(corsConfig))
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/movies', movieRoutes)
app.use('/users', userRoutes)

export default app
