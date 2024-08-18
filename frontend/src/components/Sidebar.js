import React from 'react';
import { UilHome, UilCompass, UilBell, UilEnvelopeAlt,UilBookmarkFull } from '@iconscout/react-unicons';
import {assets} from './images/assets'
import { useNavigate } from 'react-router-dom';

const Sidebar = ({name, profilePhoto ,user_name}) => {
  const navigate = useNavigate();
  const handleBookmark = () => {
    console.log('Bookmark clicked');
    navigate('/bookmark');
  }
  return (
    <div className="left">
      <div className="profile" href="#">
        <div className="profile-photo">
          <img src={profilePhoto} alt="Profile" />
        </div>
        <div className="handle">
          <h4>{name}</h4>
          <p className="text-muted">{user_name} </p>
        </div>
      </div>
    
    <div className="sidebar">
      <div className="menu-item active">
        <span><i><UilHome/></i></span>
        <h3>Home</h3>
      </div>
      <div className="menu-item">
        <span><i><UilCompass/></i></span>
        <h3>Explore</h3>
      </div>
      <div className="menu-item">
        <span><i><UilBell/><small className="notification-count">4+</small></i></span>
        <h3>Notification</h3>
        {/* Notification popup */}
        <div className="notifications-popup">
          {/* Add notification items here */}
        </div>
      </div>
      <div className="menu-item" id="messages-notification">
        <span><i><UilEnvelopeAlt/><small className="notification-count">6+</small></i></span>
        <h3>Messages</h3>
      </div>
      <div onClick={handleBookmark} className="menu-item">
        <span><i><UilBookmarkFull/></i></span>
        <h3>Bookmarks</h3>
      </div>
      {/* Add more menu items */}
    </div>
    </div>
  );
};

export default Sidebar;
