import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'


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



app.get('/', (req,res)=>{
  res.send('api is working')
})



app.listen(PORT, ()=>{
  console.log(`Server has started at port ${PORT}`)
})

//mongodb+srv://rishabhsinghmooncake:jIAUhg3jYwHdP0hx@cluster0.dgrpuia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0