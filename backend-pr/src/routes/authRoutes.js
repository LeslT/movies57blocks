// src/routes/authRoutes.js
import express from 'express'
import authController from '../controllers/authController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/user', auth, authController.user)

export default router
