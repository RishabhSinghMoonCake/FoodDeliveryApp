import jwt from 'jsonwebtoken'

async function authMiddleware(req,res, next)
{
  const {token} = req.headers
  if(!token) return res.json({success:false,message:'Not Authorized! Login Again'})
  try {
    const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId = tokenDecode.id
    next()
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }
}

export default authMiddleware