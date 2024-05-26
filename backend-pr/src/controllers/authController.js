import bcrypt from 'bcryptjs'
import { validateEmail, validatePassword } from '../utils/validator.js'
import userRepository from '../repository/userRepository.js'

const register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' })
    }
    const existingUser = await userRepository.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 10 characters long, contain one lowercase letter, one uppercase letter, and one of the following characters: !, @, #, ? or ]' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userRepository.create({ email, password: hashedPassword })

    return res.status(201).json({ message: 'User registered successfully', user: { id: user._id, email: user.email } })
  } catch (error) {
    console.error('Failed to register user', error)
    return res.status(500).json({ message: 'Failed to register user' })
  }
}

export default {
  register
}
