import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { adminHeaders } from '../../api'
const List = ({url}) => {
  
  const [list, setList] = useState([])
  async function fetchList()
  {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if(response.data.success)
      {
        setList(response.data.data)
      }
      else
      {
        toast.error("Error fetching list")
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to fetch list')
    }
  }

  async function removeFood(foodId) {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {id:foodId}, {headers: adminHeaders()})
      await fetchList()
      if(response.data.success)
      {
        toast.success(response.data.message)
      }
      else
      {
        toast.error('Error removing food')
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error('Session expired. Please log in again.')
        localStorage.removeItem('adminToken')
        window.location.reload()
      } else {
        toast.error('Failed to remove food')
        console.error(err)
      }
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div  className='list add flex-col'>
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={item.image.startsWith('http') ? item.image : `${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default List
