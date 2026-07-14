import { useContext, useEffect } from 'react'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'


const Verify = () => {


  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const sessionId = searchParams.get('session_id')
  
  const {url,token} = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyPayment = async ()=>{
    if (!token || !orderId) return navigate('/')
    const response = await axios.post(url + '/api/order/verify',{orderId, sessionId}, {headers:{token}})
    console.log(response.data)
    if(response.data.success)
    {
      navigate('/myorders')
    }
    else
    {
      navigate('/')
    }
  }

  useEffect(()=>{
    verifyPayment()
  }, [token, orderId, sessionId])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}
export default Verify
