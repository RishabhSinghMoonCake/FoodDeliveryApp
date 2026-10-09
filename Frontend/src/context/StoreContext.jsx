import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // Empty in development: Vite proxies /api, /images, and /socket.io to the local backend.
  const url = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [food_list, setFoodList] = useState([])
  const [socket, setSocket] = useState(null)

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      try {
        await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } })
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          setToken('')
        }
      }
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) }))
    if (token) {
      try {
        await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          setToken('')
        }
      }
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

  async function fetchFoodList() {
    try {
      const response = await axios.get(url + '/api/food/list')
      setFoodList(response.data.success ? response.data.data : [])
    } catch (error) {
      console.error('Failed to load food list:', error)
      setFoodList([])
    }
  }

  async function loadCartData(authToken) {
    if (!authToken) {
      setCartItems({})
      return
    }
    try {
      const response = await axios.get(url + '/api/cart/get', { headers: { token: authToken } })
      if (response.data?.success) {
        setCartItems(response.data.cartData || {})
      } else {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
      } else {
        console.error('Failed to load cart data:', err)
      }
    }
  }

  useEffect(() => {
    fetchFoodList()
  }, [])

  useEffect(() => {
    if (token) {
      loadCartData(token)
    } else {
      setCartItems({})
    }
  }, [token])

  useEffect(() => {
    if (token) {
      const socketTarget = url || 'http://localhost:5002'
      const newSocket = io(socketTarget, {
        transports: ['websocket', 'polling']
      })
      setSocket(newSocket)

      const joinUserRoom = () => {
        try {
          const decoded = jwtDecode(token)
          if (decoded?.id) {
            newSocket.emit('joinRoom', decoded.id)
          }
        } catch (err) {
          console.error('Failed to decode token for socket:', err)
        }
      }

      newSocket.on('connect', joinUserRoom)
      if (newSocket.connected) {
        joinUserRoom()
      }

      return () => {
        newSocket.disconnect()
      }
    } else {
      setSocket(null)
    }
  }, [token, url])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    socket,
    loadCartData
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
