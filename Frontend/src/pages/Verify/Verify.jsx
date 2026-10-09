import { useContext, useEffect, useRef } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId')
  const sessionId = searchParams.get('session_id')
  
  const { url, token, setCartItems } = useContext(StoreContext)
  const navigate = useNavigate()
  const calledRef = useRef(false)

  const verifyPayment = async () => {
    const activeToken = token || localStorage.getItem('token')
    if (!orderId || !activeToken) {
      navigate('/')
      return
    }

    try {
      const response = await axios.post(url + '/api/order/verify', { orderId, sessionId }, { headers: { token: activeToken } })
      if (response.data.success) {
        setCartItems({})
        navigate('/myorders')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error('Order verification failed:', err)
      navigate('/')
    }
  }

  useEffect(() => {
    if (!calledRef.current) {
      calledRef.current = true
      verifyPayment()
    }
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
