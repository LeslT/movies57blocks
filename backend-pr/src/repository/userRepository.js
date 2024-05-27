import User from '../models/user/userModel.js'

class UserRepository {
  async create (user) {
    return await User.create(user)
  }

  async findByEmail (email) {
    return await User.findOne({ email })
  }

  async findById (id) {
    return await User.findById(id)
  }

  async updateByEmail (email, updates) {
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { $set: updates },
        { new: true }
      )

      return user
    } catch (error) {
      throw new Error('Error updating user by email')
    }
  }
}

const userRepository = new UserRepository()
export default userRepository
