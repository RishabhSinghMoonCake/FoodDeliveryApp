import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import Add from "./pages/Add/Add"

import {Routes,Route, Navigate} from 'react-router'
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { apiUrl } from './api'
import AdminLogin from './pages/Login/AdminLogin'

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('adminToken'))
  if (!token) return <AdminLogin onLogin={setToken} />
  const url = apiUrl
  return(
    <div>
      <ToastContainer/>
      <Navbar onLogout={() => { localStorage.removeItem('adminToken'); setToken('') }} />
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Navigate to='/add' replace />} />
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<List url={url}/>} />
          <Route path='/orders' element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
