import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware,placeOrder)
orderRouter.post('/verify', authMiddleware, verifyOrder)
orderRouter.get('/userorders' , authMiddleware, userOrders)
orderRouter.get('/list', adminAuth, listOrders)
orderRouter.post('/status', adminAuth, updateStatus)
export default orderRouter
