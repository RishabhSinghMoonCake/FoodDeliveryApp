import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
async function loginUser(req, res)
{
  const {email,password} = req.body
  try {
    const user = await userModel.findOne({email})
    if(!user)
    {
      return res.json({success:false,message:"User does not exits!"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.json({success:false,message:"Wrong Password!"})
    const token = createToken(user._id)
    res.json({success:true,token})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Failed to login!"})
  }
}

const createToken = (id)=>{
  return jwt.sign({id} , process.env.JWT_SECRET)
}

async function registerUser(req,res)
{
  const {name,password,email} = req.body
  try {
    //checking if user already exists
    const exist = await userModel.findOne({email})
    if(exist)
    {
      return res.json({success:false,message:"User already exists!"})
    }
    //validating email format and strong password
    if(!validator.isEmail(email))
    {
      return res.json({success:false,message:"Email is not valid!"})
    }
    if(password.length < 8)
    {
      return res.json({success:false,message:"Password's length must be greater than 8"})
    }
    if(!validator.isStrongPassword(password))
    {
      return res.json({success:false,message:"Please enter a strong password!"})
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create a new user
    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error)
    res.json({success:false,message:"There was some Error!"})
  }
}

export {loginUser,registerUser}