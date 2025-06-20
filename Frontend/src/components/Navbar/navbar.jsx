import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/frontend_assets/assets.js'
import {Link} from 'react-router'
import { StoreContext } from '../../context/StoreContext.jsx'

const Navbar = ({setShowLogin}) => {

  const [basketIconActive, setBasketIconActive] = useState(false)

  const {getTotalCartAmount} = useContext(StoreContext)

  function handleBasketIconToggle()
  {
    setBasketIconActive(!basketIconActive)
  }

  return (
    <header className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/'>home</Link>
        <a href='#explore-menu'>menu</a>
        <a href='#app-download'>mobile-app</a>
        <a href='#footer'>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-basket-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="basket" /></Link>
          <div className={getTotalCartAmount()?"dot":""}>

          </div>
        </div>
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </header>
  )
}

export default Navbar