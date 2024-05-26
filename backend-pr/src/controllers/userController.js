import userRepository from '../repository/userRepository.js'
import { validatePassword } from '../utils/validator.js'
import bcrypt from 'bcryptjs'
const updateUserByEmail = async (req, res) => {
  const { email } = req.params
  const updates = req.body

  if (updates.email) {
    return res.status(400).json({ message: 'Email cannot be updated' })
  }

  if (updates.password) {
    if (!validatePassword(updates.password)) {
      return res.status(400).json({ message: 'Invalid password' })
    }
    const hashedPassword = await bcrypt.hash(updates.password, 10)
    updates.password = hashedPassword
  }

  try {
    const user = await userRepository.updateByEmail(email, updates)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  updateUserByEmail
}
