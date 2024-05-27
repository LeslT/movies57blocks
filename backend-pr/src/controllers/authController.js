import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validateEmail, validatePassword } from '../utils/validator.js'
import userRepository from '../repository/userRepository.js'

const register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }
    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 10 characters long, contain one lowercase letter, one uppercase letter, and one of the following characters: !, @, #, ? or ]'})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userRepository.create({ email, password: hashedPassword })

    return res.status(201).json({ message: 'User registered successfully', user: { id: user._id, email: user.email } })
  } catch (error) {
    console.error('Failed to register user', error)
    return res.status(500).json({ error: 'Failed to register user' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const existingUser = await userRepository.findByEmail(email)
  if (!existingUser) {
    return res.status(400).json({ error: 'Email not registered' })
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Invalid password format' })
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password)
  if (!passwordMatch) {
    return res.status(400).json({ error: 'Incorrect password' })
  }

  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '20m' })

  return res.status(200).json({ message: 'Login successful', token })
}

export default {
  register,
  login
}
