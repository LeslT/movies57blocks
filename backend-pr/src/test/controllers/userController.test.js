import userController from '../../controllers/userController.js'
import userRepository from '../../repository/userRepository.js'
import moviesServices from '../../services/movies/movies.js'
const { validatePassword } = require('../../utils/validator.js')
const bcrypt = require('bcryptjs')

jest.mock('../../repository/userRepository.js')
jest.mock('../../utils/validator.js')
jest.mock('bcryptjs')
jest.mock('../../services/movies/movies.js')

describe('updateUserByEmail', () => {
  it('should return an error if id is not provided', async () => {
    const req = { params: {} }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    userRepository.updateByEmail.mockResolvedValue({})
    await userController.updateUserByEmail(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'id cannot be updated' })
  })

  it('should return an error if email is provided in updates', async () => {
    const req = { params: { id: 1 }, body: { email: 'new@email.com' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    userRepository.updateByEmail.mockResolvedValue({})
    await userController.updateUserByEmail(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Email cannot be updated' })
  })

  it('should return an error if password is invalid', async () => {
    const req = { params: { id: 1 }, body: { password: 'short' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    validatePassword.mockReturnValue(false)

    userRepository.updateByEmail.mockResolvedValue({})
    await userController.updateUserByEmail(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' })
  })

  it('should hash the password before updating the user', async () => {
    const req = { params: { id: 1 }, body: { password: 'validPassword' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    validatePassword.mockReturnValue(true)
    userRepository.updateByEmail.mockResolvedValue({})
    bcrypt.hash.mockResolvedValue('hashedPassword')

    await userController.updateUserByEmail(req, res)

    expect(bcrypt.hash).toHaveBeenCalledWith('validPassword', 10)
    expect(userRepository.updateByEmail).toHaveBeenCalledWith(1, {
      ...req.body,
      password: 'hashedPassword'
    })
  })

  it('should return an error if userRepository.updateByEmail throws an error', async () => {
    const req = { params: { id: 1 }, body: {} }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    userRepository.updateByEmail.mockRejectedValue(new Error('Update failed'))

    await userController.updateUserByEmail(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('should return a success message and the updated user on successful update', async () => {
    const req = { params: { id: 1 }, body: {} }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    userRepository.updateByEmail.mockResolvedValue({})

    await userController.updateUserByEmail(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully', user: {} })
  })

  it('should return a error for duplicate favorites', async () => {
    const req = { params: { id: 1 }, body: { favorites : [123 , 123]} }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    userRepository.updateByEmail.mockResolvedValue({})

    await userController.updateUserByEmail(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })
})

describe('getFavoriteMovies', () => {
  it('should return a list of favorite movies', async () => {
    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const user = { favorites: [123, 456] }
    const movie1 = { id: 123, title: 'Movie 1' }
    const movie2 = { id: 456, title: 'Movie 2' }

    userRepository.findById.mockResolvedValue(user)
    moviesServices.getDetailsFromApi.mockImplementation((id) => {
      if (id === 123) return Promise.resolve(movie1)
      if (id === 456) return Promise.resolve(movie2)
    })

    await userController.getFavoriteMovies(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith([movie1, movie2])
  })

  it('should return 404 if user is not found', async () => {
    const req = { params: { id: 1 } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    userRepository.findById.mockResolvedValue(null)

    await userController.getFavoriteMovies(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' })
  })

  it('should return 400 if id is not provided', async () => {
    const req = { params: {} }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await userController.getFavoriteMovies(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Id is required' })
  })
})
