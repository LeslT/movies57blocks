import express from 'express'
import userController from '../controllers/userController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.patch('/:email', auth, userController.updateUserByEmail)
router.get('/favorites/:id', auth, userController.getFavoriteMovies)

export default router
