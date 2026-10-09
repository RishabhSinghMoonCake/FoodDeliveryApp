import { useState, useContext, useEffect } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'

const MyOrders = () => {
  const { url, token, socket } = useContext(StoreContext)
  const [data, setData] = useState([])

  async function fetchOrder() {
    if (!token) return
    try {
      const response = await axios.get(url + '/api/order/userorders', { headers: { token } })
      if (response.data.success) {
        setData(response.data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err)
      setData([])
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrder()
    }
  }, [token])

  useEffect(() => {
    if (socket) {
      const handleStatusUpdate = (updatedOrder) => {
        setData((prevData) => (prevData || []).map(order => 
          order._id === updatedOrder._id ? { ...order, status: updatedOrder.status } : order
        ))
      }

      socket.on('orderStatusUpdate', handleStatusUpdate)

      return () => {
        socket.off('orderStatusUpdate', handleStatusUpdate)
      }
    }
  }, [socket])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={order._id || index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="parcel" />
              <p>{order.items.map((item, idx) => {
                if (idx === order.items.length - 1) {
                  return item.name + ' x ' + item.quantity
                } else {
                  return item.name + ' x ' + item.quantity + ", "
                }
              })}</p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={fetchOrder}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders