import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore similique non tenetur illum quibusdam, reiciendis quisquam, ullam asperiores dolorum eligendi vitae corrupti blanditiis quas eum impedit odit ut quos eaque!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>KHAANPAAN</h2>
          <ul>
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>DELIVERY</li>
            <li>PRIVACY POLICY</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-102938477</li>
            <li>contact@khaanpaan.com</li>
          </ul>
        </div>
      </div>
      <hr />

      <p>Copyright {new Date().getFullYear()} &copy; KhaanPaan.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer