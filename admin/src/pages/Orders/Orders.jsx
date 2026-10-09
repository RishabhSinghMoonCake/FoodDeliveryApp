import './Orders.css'
import {toast} from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import {assets} from '../../assets/admin_assets/assets.js'
import { adminHeaders } from '../../api'
const Orders = ({url}) => {

  const [orders,setOrders] = useState([])

  async function fetchAllOrders()
  {
    try {
      const response = await axios.get(url+'/api/order/list', {headers: adminHeaders()})
      if(response.data.data)
      {
        setOrders(response.data.data)
        console.log(response.data.data)
      }
      else{
        toast.error('error fetching orders')
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error('Session expired. Please log in again.')
        localStorage.removeItem('adminToken')
        window.location.reload()
      } else {
        toast.error('Failed to fetch orders')
        console.error(err)
      }
    }
  }
  useEffect(() => {
    fetchAllOrders()

    const socketEndpoint = url || 'http://localhost:5002'
    const socket = io(socketEndpoint, {
      transports: ['websocket', 'polling']
    })

    const joinAdmin = () => {
      socket.emit('joinRoom', 'admin')
    }

    socket.on('connect', joinAdmin)
    if (socket.connected) {
      joinAdmin()
    }
    
    socket.on('newOrder', (newOrder) => {
      setOrders((prev) => [newOrder, ...prev])
      toast.info('New order received!')
    })

    return () => {
      socket.disconnect()
    }
  }, [url])

  async function statusHandler(event,orderId)
  {
    try {
      const response = await axios.post(url+'/api/order/status', {
        orderId,
        status:event.target.value
      }, {headers: adminHeaders()})

      if(response.data.success)
      {
        await fetchAllOrders()
      }
      else
      {
        console.log(response.data.message)
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error('Session expired. Please log in again.')
        localStorage.removeItem('adminToken')
        window.location.reload()
      } else {
        toast.error('Failed to update status')
        console.error(err)
      }
    }
  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>{
          return(
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item,index)=>{
                    if(index===order.items.length-1)
                    {
                      return item.name + " x " + item.quantity
                    }
                    else
                    {
                      return item.name + ' x ' + item.quantity + ','
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street+','}</p>
                  <p>{order.address.city + ',' + order.address.state+','+order.address.country+', '+order.address.zipcode}</p>
                  <p></p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Orders
