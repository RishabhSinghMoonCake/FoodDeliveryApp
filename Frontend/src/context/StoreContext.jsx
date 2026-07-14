import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  // Empty in development: Vite proxies /api and /images to the local backend.
  // Set VITE_API_URL to the deployed backend URL in production.
  const url = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const [token,setToken] = useState('')
  const [food_list, setFoodList] = useState([])
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if(token)
    {
      const response = await axios.post(url+'/api/cart/add', {itemId} , {headers:{token}})
    }
  }
  const removeFromCart = async  (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if(token)
    {
      await axios.post(url+'/api/cart/remove', {itemId}, {headers:{token}})
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item]
      }
      
    }
    return totalAmount
  }

  async function fetchFoodList()
  {
    try {
      const response = await axios.get(url+'/api/food/list')
      setFoodList(response.data.success ? response.data.data : [])
    } catch (error) {
      console.error('Failed to load food list:', error)
      setFoodList([])
    }
  }

  async function loadCartData(token) {
    try {
      const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
      const cartData = response.data.cartData;

      // Safety check: fallback to empty object if undefined or null
      setCartItems(cartData || {});
    } catch (err) {
      console.error('Failed to load cart data:', err);
      setCartItems({}); // fallback on failure
    }
  }


  useEffect(()=>{
    
    async function loadData()
    {
      await fetchFoodList()
      
      if(localStorage.getItem('token'))
      {
        setToken(localStorage.getItem('token'))
        await loadCartData(localStorage.getItem('token'))
      }
    }
    loadData()

  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
