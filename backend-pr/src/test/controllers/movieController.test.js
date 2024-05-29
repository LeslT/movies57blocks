import moviesController from '../../controllers/movieController.js'
import moviesServices from '../../services/movies/movies.js'
import logger from '../../lib/log.js'

jest.mock('../../services/movies/movies.js')
jest.mock('../../lib/log.js')

describe('getMovies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch movies successfully', async () => {
    const req = { query: { page: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const movies = [{ title: 'Movie 1' }, { title: 'Movie 2' }]

    moviesServices.getMoviesFromApi.mockResolvedValue(movies)

    await moviesController.getMovies(req, res)

    expect(moviesServices.getMoviesFromApi).toHaveBeenCalledWith(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Movies fetched successfully', movies })
  })

  it('should handle error while fetching movies', async () => {
    const req = { query: { page: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const error = new Error('Failed to fetch movies')

    moviesServices.getMoviesFromApi.mockRejectedValue(error)

    await moviesController.getMovies(req, res)

    expect(moviesServices.getMoviesFromApi).toHaveBeenCalledWith(1)
    expect(logger.info).toHaveBeenCalledWith('', {
      timestamp: expect.any(Date),
      service: 'MOVIE_CONTROLLER',
      action: 'GET_MOVIES_RES',
      type: 'ERROR',
      message: 'Movies are fetched successfully',
      log: error.message || error.stack,
    })
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch movies' })
  })
})

describe('getMoviesById', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch movie details successfully', async () => {
    const req = { params: { id: 'movieId' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const movieDetails = { title: 'Movie Title', director: 'Director Name' }
    moviesServices.getDetailsFromApi.mockResolvedValue(movieDetails)
    await moviesController.getMoviesById(req, res)
    expect(moviesServices.getDetailsFromApi).toHaveBeenCalledWith('movieId')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Movies fetched successfully', movie: movieDetails })
  })

  it('should handle error while fetching movie details', async () => {
    const req = { params: { id: 'invalidId' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const error = new Error('Failed to fetch movie details')
    moviesServices.getDetailsFromApi.mockRejectedValue(error)
    await moviesController.getMoviesById(req, res)
    expect(moviesServices.getDetailsFromApi).toHaveBeenCalledWith('invalidId')
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch movie details' })
  })
})
