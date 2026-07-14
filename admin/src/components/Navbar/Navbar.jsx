import './Navbar.css'
import {assets} from '../../assets/admin_assets/assets.js'
const Navbar = ({ onLogout }) => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <button className='profile' onClick={onLogout}>Logout</button>
    </div>
  )
}
export default Navbar
