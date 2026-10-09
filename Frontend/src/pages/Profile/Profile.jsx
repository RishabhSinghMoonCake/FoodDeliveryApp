import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { assets } from '../../assets/frontend_assets/assets'

const Profile = () => {
  const { url, token } = useContext(StoreContext)
  const [profileData, setProfileData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(url + '/api/user/profile', { headers: { token } })
        if (response.data.success) {
          setProfileData(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
    fetchProfile()
  }, [token, url, navigate])

  return (
    <div className='profile-page'>
      <h2>My Profile</h2>
      {profileData ? (
        <div className="profile-details">
          <img src={assets.profile_icon} alt="Profile" className='profile-avatar' />
          <div className="profile-info">
            <p><b>Name:</b> {profileData.name}</p>
            <p><b>Email:</b> {profileData.email}</p>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  )
}

export default Profile
