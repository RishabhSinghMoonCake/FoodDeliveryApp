import express from 'express'
import {loginUser,registerUser,adminLogin,getProfile} from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.js'
import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login requests per windowMs
  message: { success: false, message: 'Too many login attempts, please try again later' }
})

const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginLimiter, loginUser)
userRouter.post('/admin/login', loginLimiter, adminLogin)
userRouter.get('/profile', authMiddleware, getProfile)

export default userRouter
