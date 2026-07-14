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



app.listen(PORT, ()=>{
  console.log(`Server has started at port ${PORT}`)
})

