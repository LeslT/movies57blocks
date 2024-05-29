import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validateEmail, validatePassword } from '../utils/validator.js'
import userRepository from '../repository/userRepository.js'
import logger from '../lib/log.js'

const register = async (req, res) => {
  try {
    const { email, password } = req.body
    logger.info('', {
      timestamp: new Date(),
      service: 'REGISTER_CONTROLLER',
      action: 'REGISTER_USER_REQ',
      type: 'INFO',
      message: 'A registration request is received from a user',
      log: email
    })
    if (!validateEmail(email)) {
      logger.info('', {
        timestamp: new Date(),
        service: 'REGISTER_CONTROLLER',
        action: 'REGISTER_USER_RES',
        type: 'ERROR',
        message: 'Invalid email address',
        log: email
      })
      return res.status(400).json({ error: 'Invalid email address' })
    }
    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
      logger.info('', {
        timestamp: new Date(),
        service: 'REGISTER_CONTROLLER',
        action: 'REGISTER_USER_RES',
        type: 'ERROR',
        message: 'Email already registered',
        log: email
      })
      return res.status(400).json({ error: 'Email already registered' })
    }
    if (!validatePassword(password)) {
      logger.info('', {
        timestamp: new Date(),
        service: 'REGISTER_CONTROLLER',
        action: 'REGISTER_USER_RES',
        type: 'ERROR',
        message: 'Password must be at least 10 characters long, contain one lowercase letter, one uppercase letter, and one of the following characters: !, @, #, ? or ]',
        log: email
      })
      return res.status(400).json({ error: 'Password must be at least 10 characters long, contain one lowercase letter, one uppercase letter, and one of the following characters: !, @, #, ? or ]' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userRepository.create({ email, password: hashedPassword })
    logger.info('', {
      timestamp: new Date(),
      service: 'REGISTER_CONTROLLER',
      action: 'REGISTER_USER_RES',
      type: 'INFO',
      message: 'register user successfully',
      log: email
    })
    return res.status(201).json({ message: 'User registered successfully', user: { id: user._id, email: user.email } })
  } catch (error) {
    console.error('Failed to register user', error)
    logger.info('', {
      timestamp: new Date(),
      service: 'REGISTER_CONTROLLER',
      action: 'REGISTER_USER_RES',
      type: 'ERROR',
      message: 'service error',
      log: error.message || error.stack
    })
    return res.status(500).json({ error: 'Failed to register user' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    logger.info('', {
      timestamp: new Date(),
      service: 'LOGIN_CONTROLLER',
      action: 'LOGIN_USER_REQ',
      type: 'INFO',
      message: 'Login request is received from a user',
      log: email
    })
    if (!validateEmail(email)) {
      logger.info('', {
        timestamp: new Date(),
        service: 'LOGIN_CONTROLLER',
        action: 'LOGIN_USER_RES',
        type: 'ERROR',
        message: 'Invalid email address',
        log: email
      })
      return res.status(400).json({ error: 'Invalid email address' })
    }

    const existingUser = await userRepository.findByEmail(email)
    if (!existingUser) {
      logger.info('', {
        timestamp: new Date(),
        service: 'LOGIN_CONTROLLER',
        action: 'LOGIN_USER_RES',
        type: 'ERROR',
        message: 'Email not registered',
        log: email
      })
      return res.status(400).json({ error: 'Email not registered' })
    }

    if (!validatePassword(password)) {
      logger.info('', {
        timestamp: new Date(),
        service: 'LOGIN_CONTROLLER',
        action: 'LOGIN_USER_RES',
        type: 'ERROR',
        message: 'Invalid password format',
        log: email
      })
      return res.status(400).json({ error: 'Invalid password format' })
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordMatch) {
      logger.info('', {
        timestamp: new Date(),
        service: 'LOGIN_CONTROLLER',
        action: 'LOGIN_USER_RES',
        type: 'ERROR',
        message: 'Incorrect password',
        log: email
      })
      return res.status(400).json({ error: 'Incorrect password' })
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '20m' })
    logger.info('', {
      timestamp: new Date(),
      service: 'LOGIN_CONTROLLER',
      action: 'LOGIN_USER_RES',
      type: 'INFO',
      message: 'Login successful',
      log: email
    })
    return res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    logger.info('', {
      timestamp: new Date(),
      service: 'LOGIN_CONTROLLER',
      action: 'LOGIN_USER_RES',
      type: 'ERROR',
      message: 'Service error',
      log: error.message || error.stack
    })
    return res.status(500).json({ error: 'Failed to login' })
  }
}

const user = async (req, res) => {
  const existingUser = await userRepository.findById(req.user.id)
  return res.status(200).json({ user: existingUser })
}

const userAuth = async (req, res) => {
  return res.json(req.user)
}

export default {
  register,
  login,
  user,
  userAuth
}
