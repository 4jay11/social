import React from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'
const ProfileSection = ({currentUser}) => {
  return (
    <div>
        <Navbar currentUser={currentUser} />
        <div className='left'> <ProfileCard /></div>
       <div className='right'>

       </div>
        
    </div>
  )
}

export default ProfileSection