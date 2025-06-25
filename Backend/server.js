import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'


const app = express()
const PORT = process.env.PORT||5002

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB()


//api endpoint
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)


app.get('/', (req,res)=>{
  res.send('api is working')
})



app.listen(PORT, ()=>{
  console.log(`Server has started at port ${PORT}`)
})

