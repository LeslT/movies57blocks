import axios from 'axios'
import movieServices from '../../services/movies/movies'

jest.mock('axios')

describe('Movie Services', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getMoviesFromApi', () => {
    it('should fetch movies successfully', async () => {
      const expectedData = 'movies_data'
      
      axios.get.mockResolvedValueOnce({ data: expectedData })

      const result = await movieServices.getMoviesFromApi()

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('now_playing'), {
        params: {},
        headers: {
          Authorization: expect.stringContaining('Bearer '),
          accept: 'application/json'
        }
      })
      expect(result).toBe(expectedData)
    })

    it('should throw an error when fetching movies fails', async () => {
      const errorMessage = 'Failed to fetch movies'

      axios.get.mockRejectedValueOnce(new Error(errorMessage))

      await expect(movieServices.getMoviesFromApi()).rejects.toThrow('Could not fetch movies')
    })
  })

  describe('getDetailsFromApi', () => {
    it('should fetch movie details successfully', async () => {
      const movieId = '123'
      const expectedData = 'movie_details'

      axios.get.mockResolvedValueOnce({ data: expectedData })

      const result = await movieServices.getDetailsFromApi(movieId)

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(movieId), {
        headers: {
          Authorization: expect.stringContaining('Bearer '),
          accept: 'application/json'
        }
      })
      expect(result).toBe(expectedData)
    })

    it('should throw an error when fetching movie details fails', async () => {
      const movieId = '123'
      const errorMessage = 'Failed to fetch movie details'

      axios.get.mockRejectedValueOnce(new Error(errorMessage))

      await expect(movieServices.getDetailsFromApi(movieId)).rejects.toThrow(errorMessage)
    })

    it('should throw an error when movie ID is not provided', async () => {
      await expect(movieServices.getDetailsFromApi()).rejects.toThrow('Movie ID is required')
    })
  })
})
