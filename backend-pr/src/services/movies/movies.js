import axios from 'axios'
const API_KEY = process.env.MOVIE_API_KEY || ''
const BASE_URL = process.env.MOVIE_BASE_URL || ''

const getMoviesFromApi = async (page) => {
  try {
    const params = {}
    const route = `${BASE_URL}/now_playing`
    if (page) {
      params.page = page
    }

    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      accept: 'application/json'
    }

    const response = await axios.get(route, { params, headers })
    return response.data
  } catch (error) {
    console.error('Error fetching movies from TMDb:', error)
    throw new Error('Could not fetch movies')
  }
}

const getDetailsFromApi = async (id) => {
  try {
    if (!id) {
      throw new Error('Movie ID is required')
    }
    const route = `${BASE_URL}/${id}`
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      accept: 'application/json'
    }

    const response = await axios.get(route, { headers })
    return response.data
  } catch (error) {
    console.error('Error fetching movies from TMDb:', error.message || error.stack)
    throw new Error('Could not fetch movies')
  }
}

export default { getMoviesFromApi, getDetailsFromApi }
