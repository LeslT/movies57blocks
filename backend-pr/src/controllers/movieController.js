import moviesServices from '../services/movies/movies.js'

const getMovies = async (req, res) => {
  const { page } = req.query

  try {
    const movies = await moviesServices.getMoviesFromApi(page)
    res.status(200).json({ message: 'Movies fetched successfully', movies })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  getMovies
}
