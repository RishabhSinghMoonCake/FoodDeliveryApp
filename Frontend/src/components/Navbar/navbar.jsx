import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/frontend_assets/assets.js'

const Navbar = () => {

  const [basketIconActive, setBasketIconActive] = useState(false)

  function handleBasketIconToggle()
  {
    setBasketIconActive(!basketIconActive)
  }

  return (
    <header className='navbar'>
      <img src={assets.logo} alt="logo" />
      <ul className="navbar-menu">
        <li>home</li>
        <li>menu</li>
        <li>mobile-app</li>
        <li>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-basket-icon">
          <img src={assets.basket_icon} alt="basket" />
          <div className={basketIconActive?"dot":""}>

          </div>
        </div>
        <button>sign in</button>
      </div>
    </header>
  )
}

export default Navbar