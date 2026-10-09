import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { Server } from 'socket.io'
import http from 'http'
dotenv.config()

const app = express()
const PORT = process.env.PORT||5002

//middleware
app.use(express.json())
const allowedOrigins = (process.env.CLIENT_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean)
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Origin is not allowed by CORS'))
  }
}))

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
})

app.set('io', io)

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)
  
  // User/Admin can join a room based on their ID or role
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

//db connection
connectDB()


//api endpoint
app.use('/api/food', foodRouter)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use('/images', express.static(path.join(__dirname, 'uploads')))
app.use('/api/user', userRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res)=>{
  res.send('api is working')
})



if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, ()=>{
    console.log(`Server has started at port ${PORT}`)
  })
}

export default app

