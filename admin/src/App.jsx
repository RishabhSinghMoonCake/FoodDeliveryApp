import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import Add from "./pages/Add/Add"

import {Routes,Route} from 'react-router'
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const url = 'https://khaanpaan.onrender.com'
  return(
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
