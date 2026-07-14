import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend

const placeOrder = async (req,res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
  try {
    const newOrder = new orderModel({
      userId:req.body.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address
    })
    await newOrder.save()

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
      success_url:`${frontendUrl}/verify?orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${frontendUrl}/verify?orderId=${newOrder._id}`,
      metadata: { orderId: newOrder._id.toString(), userId: req.body.userId },
      
    })

    res.json({success:true,session_url:session.url})

  } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
  }
}

async function verifyOrder(req,res)
{
  const {orderId, sessionId} = req.body
  try
  {
    const order = await orderModel.findById(orderId)
    if (!order || order.userId !== req.user.id) return res.status(404).json({success:false, message:'Order not found'})
    if (!sessionId) return res.json({success:false, message:'Payment was cancelled'})
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid' || session.metadata.orderId !== orderId) {
      return res.json({success:false, message:'Payment has not completed'})
    }
    await orderModel.findByIdAndUpdate(orderId,{payment:true})
    await userModel.findByIdAndUpdate(req.user.id, {cartData:{}})
    res.json({success:true, message:"Payment confirmed"})
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
