import React from 'react'
import './ProfileSection.css' 
import { UilEdit,UilFileAlt, UilUserPlus, UilUsersAlt } from '@iconscout/react-unicons';
import { assets } from './images/assets';  
const ProfileCard = ({currentUser}) => {
  const cloudinaryLink = process.env.REACT_APP_CLOUDINARY_LINK;

  const { name, profile_image, username ,description} = currentUser;
  return (
    <div className='profile-card'>
      <div className='image'>
        <img src={cloudinaryLink+profile_image} alt='profile' className='profile-img'/>
      </div>
      <div className='text-data'>
      <span className='idd text-muted'>{username} <UilEdit className='id' /></span>
        <span className='name'>{name}</span>
        <span className='oneline'>{description}</span>
      </div>
      <div className='buttons'>
        <button className='button'>Follow</button>
        <button className='button'>Message</button>
      </div>
      <div className='stats'>
      <div className='data'>
        <i><UilFileAlt /></i>
        <span>{currentUser.posts.length}</span>
        
      </div>
      <div className='data'>
        <i><UilUserPlus /></i>
        <span>{currentUser.following.length}</span>

      </div>
      <div className='data'>
        <i><UilUsersAlt /></i>
        <span>{currentUser.followers.length}</span>

      </div>
      </div>
    </div>
  )
}

export default ProfileCard;