import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import './Login.css'
import { useContext, useState } from 'react'
import axios from 'axios'
const Login = ({setShowLogin}) => {

  const [currentState,setCurrentState] = useState("Sign Up")
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const {url,setToken} = useContext(StoreContext)

  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  async function onLogin(event)
  {
    event.preventDefault()
    let newUrl = url;
    if(currentState === 'Login')
    {
      newUrl += '/api/user/login'
    }
    else{
      newUrl += '/api/user/register'
    }

    const response = await axios.post(newUrl, data)
    if(response.data.success)
    {
      setToken(response.data.token)
      localStorage.setItem('token' , response.data.token)
      setShowLogin(false)
    }
    else
    {
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState==="Login"?<></>:<input onChange={(e)=>onChangeHandler(e)} value={data.name} name='name' type="text" placeholder='Your Name' required />}
          
          <input onChange={(e)=>onChangeHandler(e)} value={data.email} name='email' type="email" placeholder='Your Email' required />
          <input onChange={(e)=>onChangeHandler(e)} value={data.password} name='password' type="password" placeholder='Password' required />

        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By Continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        {
          currentState==="Login"?<p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
          :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>

        }
        
        
      </form>
    </div>
  )
}
export default Login