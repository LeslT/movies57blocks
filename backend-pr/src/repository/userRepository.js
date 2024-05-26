import User from '../models/user/userModel.js'

class UserRepository {
  async create (user) {
    return await User.create(user)
  }

  async findByEmail (email) {
    return await User.findOne({ email })
  }

  async findById (email) {
    return await User.findOne({ email })
  }
}

const userRepository = new UserRepository()
export default userRepository
