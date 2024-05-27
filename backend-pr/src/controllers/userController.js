import userRepository from '../repository/userRepository.js'
import moviesServices from '../services/movies/movies.js'
import { validatePassword } from '../utils/validator.js'
import bcrypt from 'bcryptjs'
import logger from '../lib/log.js'

const updateUserByEmail = async (req, res) => {
  const { id } = req.params
  const updates = req.body

  try {
    logger.info('', {
      timestamp: new Date(),
      service: 'USER_CONTROLLER',
      action: 'UPDATE_USER_REQ',
      type: 'INFO',
      message: 'A update request is received from a user',
      log: { id, updates }
    })
    if (!id) {
      logger.info('', {
        timestamp: new Date(),
        service: 'USER_CONTROLLER',
        action: 'UPDATE_USER_RES',
        type: 'ERROR',
        message: 'id cannot be updated',
        log: updates
      })
      return res.status(400).json({ error: 'Email cannot be updated' })
    }
    if (updates.email) {
      logger.info('', {
        timestamp: new Date(),
        service: 'USER_CONTROLLER',
        action: 'UPDATE_USER_RES',
        type: 'ERROR',
        message: 'Email cannot be updated',
        log: updates
      })
      return res.status(400).json({ error: 'Email cannot be updated' })
    }

    if (updates.password) {
      if (!validatePassword(updates.password)) {
        logger.info('', {
          timestamp: new Date(),
          service: 'USER_CONTROLLER',
          action: 'UPDATE_USER_RES',
          type: 'ERROR',
          message: 'Invalid password',
          log: updates
        })
        return res.status(400).json({ error: 'Invalid password' })
      }
      const hashedPassword = await bcrypt.hash(updates.password, 10)
      updates.password = hashedPassword
    }
    const user = await userRepository.updateByEmail(id, updates)
    logger.info('', {
      timestamp: new Date(),
      service: 'USER_CONTROLLER',
      action: 'UPDATE_USER_RES',
      type: 'INFO',
      message: 'User updated successfully',
      log: updates
    })
    res.status(200).json({ message: 'User updated successfully', user })
  } catch (error) {
    logger.info('', {
      timestamp: new Date(),
      service: 'USER_CONTROLLER',
      action: 'UPDATE_USER_RES',
      type: 'ERROR',
      message: 'User updated failed',
      log: error.message || error.stack
    })
    res.status(500).json({ error: error.message })
  }
}

const getFavoriteMovies = async (req, res) => {
  const { id } = req.params
  logger.info('', {
    timestamp: new Date(),
    service: 'USER_CONTROLLER',
    action: 'GET_FAVORITES_REQ',
    type: 'INFO',
    message: 'User updated successfully',
    log: id
  })
  if (!id) {
    logger.info('', {
      timestamp: new Date(),
      service: 'USER_CONTROLLER',
      action: 'GET_FAVORITES_RES',
      type: 'ERROR',
      message: 'Email is required',
      log: id
    })
    return res.status(400).json({ message: 'Id is required' })
  }

  try {
    const user = await userRepository.findById(id)
    if (!user) {
      logger.info('', {
        timestamp: new Date(),
        service: 'USER_CONTROLLER',
        action: 'GET_FAVORITES_RES',
        type: 'ERROR',
        message: 'User not found',
        log: id
      })
      return res.status(404).json({ message: 'User not found' })
    }

    const favoriteMovieIds = user.favorites || []

    const movieDetailsPromises = favoriteMovieIds.map(id => moviesServices.getDetailsFromApi(id))
    const results = await Promise.allSettled(movieDetailsPromises)

    const successfulMovies = results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value)
    logger.info('', {
      timestamp: new Date(),
      service: 'USER_CONTROLLER',
      action: 'GET_FAVORITES_RES',
      type: 'INFO',
      message: 'Favorite movies fetched successfully',
      log: successfulMovies
    })
    res.status(200).json(successfulMovies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default {
  updateUserByEmail,
  getFavoriteMovies
}
