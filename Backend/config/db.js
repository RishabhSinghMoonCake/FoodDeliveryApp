//logic to connect with the database
import mongoose from "mongoose"

export const connectDB = async ()=>{
  await mongoose.connect('mongodb+srv://rishabhsinghmooncake:jIAUhg3jYwHdP0hx@cluster0.dgrpuia.mongodb.net/FoodDelivery').then(()=>console.log('DB connected'))
}