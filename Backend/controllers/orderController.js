import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend

const placeOrder = async (req,res) => {
  const frontendUrl = 'https://khaanpann-frontend.onrender.com'
  try {
    const newOrder = new orderModel({
      userId:req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address
    })
    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}})

    const line_items = req.body.items.map((item)=>(
      {
        price_data:{
          currency:"usd",
          product_data:{
            name:item.name
          },
          unit_amount:item.price*100
        },
        quantity:item.quantity
      }
    ))

    line_items.push({
      price_data:{
        currency:"usd",
        product_data:{
          name:"Delivery Charges"
        },
        unit_amount:2 * 100,
      },
      quantity:1
    })

    const session = await stripe.checkout.sessions.create({
      line_items:line_items,
      mode:'payment',
      success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
      
    })

    res.json({success:true,session_url:session.url})

  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }
}

async function verifyOrder(req,res)
{
  const {orderId , success} = req.body
  try
  {
    if(success==='true')
    {
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
      res.json({success:true, message:"paid"})
    }
    else
    {
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false,message:'Not Paid'})
    }
  }
  catch(error)
  {
    console.log(error)
    res.json({success:false,message:'error'})
  }

}

//user orders for frontend
async function userOrders(req,res)
{
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
  }
}
//listing orders for admin panel
async function listOrders(req,res)
{
  try {
    const orders = await orderModel.find({})
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
  }
}
//api for updating order status
async function updateStatus(req,res)
{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:'status Updated'})
  } catch (error) {
    console.log(error)
    res.json({success:false, message:"error"})
  }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
