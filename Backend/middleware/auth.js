import jwt from 'jsonwebtoken'

async function authMiddleware(req, res, next) {
  const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ success: false, message: 'Not Authorized! Login Again' })
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: tokenDecode.id, role: tokenDecode.role || 'customer' }
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export default authMiddleware
