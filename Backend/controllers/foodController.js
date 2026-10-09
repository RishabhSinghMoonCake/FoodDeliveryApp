import foodModel from '../models/foodModel.js'
import fs from 'fs' //file system prebuilt in nodejs

//add food item

const addFood = async (req,res)=>{
  let image_url = req.file?.secure_url || req.file?.path || req.file?.filename || "";

  const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_url
  })
  try {
    await food.save()
    res.json({success:true,message:'Food Added'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
  }
}

//all food list
const listFood = async (req,res) => {
  try {
    const foods = await foodModel.find({})
    res.json({success:true, data:foods})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
  }
}


//remove food item
import { cloudinary } from '../config/cloudinary.js'

const removeFood = async (req,res)=>{
  try {
    const food = await foodModel.findById(req.body.id)
    if (food.image.startsWith('http')) {
      // It's a Cloudinary URL, extract public_id
      const parts = food.image.split('/')
      const filename = parts[parts.length - 1]
      const publicId = 'FoodDeliveryApp/' + filename.split('.')[0]
      await cloudinary.uploader.destroy(publicId)
    } else {
      fs.unlink(`uploads/${food.image}`, ()=>{})
    }

    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:'Food Removed'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
  }
}

export {addFood,removeFood,listFood}


