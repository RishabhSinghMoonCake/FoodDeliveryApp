import { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { apiUrl } from '../../api'
import 'react-toastify/dist/ReactToastify.css'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function submit(event) {
    event.preventDefault()
    try {
      const response = await axios.post(`${apiUrl}/api/user/admin/login`, { email, password })
      if (!response.data.success) return toast.error(response.data.message)
      localStorage.setItem('adminToken', response.data.token)
      onLogin(response.data.token)
    } catch (error) { toast.error(error.response?.data?.message || 'Unable to sign in') }
  }
  return <main className="admin-login"><ToastContainer /><form onSubmit={submit} className="admin-login-form">
    <h2>Admin sign in</h2>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    <button type="submit">Sign in</button>
  </form></main>
}
export default AdminLogin
