import userRepository from '../repository/userRepository.js'
import moviesServices from '../services/movies/movies.js'
import { validatePassword } from '../utils/validator.js'
import bcrypt from 'bcryptjs'
const updateUserByEmail = async (req, res) => {
  const { email } = req.params
  const updates = req.body

  if (updates.email) {
    return res.status(400).json({ error: 'Email cannot be updated' })
  }

  if (updates.password) {
    if (!validatePassword(updates.password)) {
      return res.status(400).json({ error: 'Invalid password' })
    }
    const hashedPassword = await bcrypt.hash(updates.password, 10)
    updates.password = hashedPassword
  }

  try {
    const user = await userRepository.updateByEmail(email, updates)
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getFavoriteMovies = async (req, res) => {
  const { email } = req.params

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    const user = await userRepository.findByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const favoriteMovieIds = user.favorites || []

    const movieDetailsPromises = favoriteMovieIds.map(id => moviesServices.getDetailsFromApi(id))
    const results = await Promise.allSettled(movieDetailsPromises)

    const successfulMovies = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value)

    res.json(successfulMovies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  updateUserByEmail,
  getFavoriteMovies
}
