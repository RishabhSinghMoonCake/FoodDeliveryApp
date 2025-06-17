import { assets } from '../../assets/frontend_assets/assets'
import './Login.css'
import { useState } from 'react'
const Login = ({setShowLogin}) => {

  const [currentState,setCurrentState] = useState("Sign Up")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
      </form>
    </div>
  )
}
export default Login