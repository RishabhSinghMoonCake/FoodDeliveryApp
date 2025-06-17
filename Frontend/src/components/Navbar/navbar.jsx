import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/frontend_assets/assets.js'
import {Link} from 'react-router'

const Navbar = ({setShowLogin}) => {

  const [basketIconActive, setBasketIconActive] = useState(false)

  function handleBasketIconToggle()
  {
    setBasketIconActive(!basketIconActive)
  }

  return (
    <header className='navbar'>
      <img className='logo' src={assets.logo} alt="logo" />
      <ul className="navbar-menu">
        <Link to='/'>home</Link>
        <a href='#explore-menu'>menu</a>
        <a href='#app-download'>mobile-app</a>
        <a href='#footer'>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-basket-icon">
          <img src={assets.basket_icon} alt="basket" />
          <div className={basketIconActive?"dot":""}>

          </div>
        </div>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </header>
  )
}

export default Navbar