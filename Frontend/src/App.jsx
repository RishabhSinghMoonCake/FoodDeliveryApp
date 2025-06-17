import './App.css'
import React, {useState} from 'react'
import {Routes,Route} from "react-router"
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
import Login from './components/LoginPopUp/Login.jsx'
import Navbar from './components/Navbar/navbar.jsx'
function App() {

  const [showLogin, setShowLogin]  = useState(false)

  return(
    <div className='app-wrapper'>
      {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
