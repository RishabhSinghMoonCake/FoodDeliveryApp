import './App.css'
import React from 'react'
import {Routes,Route} from "react-router"
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
function App() {
  return(
    <div className='app-wrapper'>
      <div className='app'>
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
