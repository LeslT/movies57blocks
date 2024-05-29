import bcrypt from 'bcryptjs'
import registerController from '../../controllers/authController.js'
import userRepository from '../../repository/userRepository.js'
import jwt from 'jsonwebtoken'

jest.mock('bcryptjs')
jest.mock('../../repository/userRepository.js')
jest.mock('jsonwebtoken')

describe('register', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should register a new user successfully', async () => {
    const req = { body: { email: 'test@example.com', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const hashedPassword = 'hashedPassword'
    const newUser = { _id: 'userId', email: 'test@example.com' }

    bcrypt.hash.mockResolvedValue(hashedPassword)
    userRepository.create.mockResolvedValue(newUser)

    await registerController.register(req, res)

    expect(bcrypt.hash).toHaveBeenCalledWith('ValidPassword123!', 10)
    expect(userRepository.create).toHaveBeenCalledWith({ email: 'test@example.com', password: hashedPassword })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully', user: { id: 'userId', email: 'test@example.com' } })
  })

  it('should return 400 if email is invalid', async () => {
    const req = { body: { email: 'invalidemail', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await registerController.register(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email address' })
  })

  it('should return 400 if password is invalid', async () => {
    const req = { body: { email: 'test10@example.com', password: 'invalid' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    await registerController.register(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Password must be at least 10 characters long, contain one lowercase letter, one uppercase letter, and one of the following characters: !, @, #, ? or ]' })
  })

  it('should return 400 if email is already registered', async () => {
    const req = { body: { email: 'test@example.com', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    userRepository.findByEmail.mockResolvedValue({})

    await registerController.register(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Email already registered' })
  })
})

describe('login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should log in a user successfully', async () => {
    const req = { body: { email: 'test@example.com', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const existingUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' }
    const token = 'generatedToken'

    userRepository.findByEmail.mockResolvedValue(existingUser)
    bcrypt.compare.mockResolvedValue(true)
    jwt.sign.mockReturnValue(token)

    await registerController.login(req, res)

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com')
    expect(bcrypt.compare).toHaveBeenCalledWith('ValidPassword123!', 'hashedPassword')
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'userId' }, process.env.JWT_SECRET, { expiresIn: '20m' })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', token })
  })

  it('should return 400 if email is invalid', async () => {
    const req = { body: { email: 'invalidemail', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await registerController.login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email address' })
  })

  it('should return 400 if email is not registered', async () => {
    const req = { body: { email: 'nonexistent@example.com', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    userRepository.findByEmail.mockResolvedValue(null)

    await registerController.login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Email not registered' })
  })

  it('should return 400 if password is invalid', async () => {
    const req = { body: { email: 'test@example.com', password: 'invalid' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const existingUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' }
    userRepository.findByEmail.mockResolvedValue(existingUser)
    await registerController.login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password format' })
  })

  it('should return 400 if password is incorrect', async () => {
    const req = { body: { email: 'test@example.com', password: 'InvalidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const existingUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' }

    userRepository.findByEmail.mockResolvedValue(existingUser)
    bcrypt.compare.mockResolvedValue(false)

    await registerController.login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Incorrect password' })
  })

  it('should return 500 if userRepository.findByEmail throws an error', async () => {
    const req = { body: { email: 'test@example.com', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    userRepository.findByEmail.mockRejectedValue(new Error('Failed to find user'))

    await registerController.login(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to login' })
  })

  it('should return the existing user when findByEmail is called', async () => {
    const req = { body: { email: 'test@example.com', password: 'ValidPassword123!' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const existingUser = { _id: 'userId', email: 'test@example.com', password: 'hashedPassword' }

    userRepository.findByEmail.mockResolvedValue(existingUser)

    await registerController.login(req, res)

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com')
  })
})
