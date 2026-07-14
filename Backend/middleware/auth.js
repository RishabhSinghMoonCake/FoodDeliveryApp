import jwt from 'jsonwebtoken'

async function authMiddleware(req,res, next)
{
  const token = req.headers.token || req.headers.authorization?.replace('Bearer ', '')
  if(!token) return res.json({success:false,message:'Not Authorized! Login Again'})
  try {
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = { id: tokenDecode.id, role: tokenDecode.role || 'customer' }
    req.body.userId = tokenDecode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }
}

export default authMiddleware
