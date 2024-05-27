import moviesServices from '../services/movies/movies.js'
import logger from '../lib/log.js'

const getMovies = async (req, res) => {
  const { page } = req.query

  try {
    logger.info('', {
      timestamp: new Date(),
      service: 'MOVIE_CONTROLLER',
      action: 'GET_MOVIES_REQ',
      type: 'INFO',
      message: 'A user request the list of movies',
      log: page
    })
    const movies = await moviesServices.getMoviesFromApi(page)
    logger.info('', {
      timestamp: new Date(),
      service: 'MOVIE_CONTROLLER',
      action: 'GET_MOVIES_RES',
      type: 'INFO',
      message: 'Movies are fetched successfully',
      log: page
    })
    res.status(200).json({ message: 'Movies fetched successfully', movies })
  } catch (error) {
    logger.info('', {
      timestamp: new Date(),
      service: 'MOVIE_CONTROLLER',
      action: 'GET_MOVIES_RES',
      type: 'ERROR',
      message: 'Movies are fetched successfully',
      log: error.message || error.stack
    })
    res.status(500).json({ error: error.message })
  }
}

export default {
  getMovies
}
