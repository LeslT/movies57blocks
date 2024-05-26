import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decodedToken.userId }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export default auth
