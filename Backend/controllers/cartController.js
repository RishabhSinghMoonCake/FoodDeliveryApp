import userModel from '../models/userModel.js'

//add items to user cart

async function addToCart(req, res) {
  try {
    let userData = await userModel.findById(req.body.userId);

    // If user not found, optionally create
    if (!userData) {
      // Uncomment to auto-create user
      // userData = await userModel.create({ _id: req.body.userId, cartData: {} });
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


//remove items from user cart

async function removeFromCart(req, res) {
  try {
    let userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: 'Removed from cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


//fetch user cart data

async function getCart(req, res) {
  try {
    let userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


export {addToCart,removeFromCart,getCart}