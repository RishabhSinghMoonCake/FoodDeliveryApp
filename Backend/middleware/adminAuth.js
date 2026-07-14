import jwt from 'jsonwebtoken'

function adminAuth(req, res, next) {
  const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ success: false, message: 'Admin login required' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (payload.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' })
    req.user = { id: payload.id, role: payload.role }
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired admin session' })
  }
}

export default adminAuth
