import express from 'express'
import movieController from '../controllers/movieController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/list', auth, movieController.getMovies)
router.get('/:id', auth, movieController.getMoviesById)

export default router
