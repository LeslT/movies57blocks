import jwt from 'jsonwebtoken'
import authMiddleware from '../../middlewares/auth.js'

jest.mock('jsonwebtoken')

describe('auth middleware', () => {
  const req = {
    headers: {
      authorization: 'Bearer someValidToken',
    },
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }
  const next = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call next() if token is provided and valid', () => {
    jwt.verify.mockReturnValue({ userId: 'validUserId' })

    authMiddleware(req, res, next)

    expect(jwt.verify).toHaveBeenCalledWith('someValidToken', process.env.JWT_SECRET)
    expect(req.user).toEqual({ id: 'validUserId' })
    expect(next).toHaveBeenCalled()
  })

  it('should return 401 if no token is provided', () => {
    req.headers.authorization = undefined

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if token is invalid', () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token')
    })

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })
})
