import React from 'react'
import './ProfileSection.css' 
import { UilEdit,UilFileAlt, UilUserPlus, UilUsersAlt } from '@iconscout/react-unicons';
import { assets } from './images/assets';  
const ProfileCard = () => {
  return (
    <div className='profile-card'>
      <div className='image'>
        <img src={assets.profile7} alt='profile' className='profile-img'/>
      </div>
      <div className='text-data'>
      <span className='id text-muted'>_ajay.4 <UilEdit className='id' /></span>
        <span className='name'>Ajay</span>
        <span className='oneline'>Student</span>
      </div>
      <div className='buttons'>
        <button className='button'>Follow</button>
        <button className='button'>Message</button>
      </div>
      <div className='stats'>
      <div className='data'>
        <i><UilFileAlt /></i>
        <span>44k</span>
        
      </div>
      <div className='data'>
        <i><UilUserPlus /></i>
        <span>4k</span>

      </div>
      <div className='data'>
        <i><UilUsersAlt /></i>
        <span>11k</span>

      </div>
      </div>
    </div>
  )
}

export default ProfileCard;