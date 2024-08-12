import React from 'react';
import { UilHome, UilCompass, UilBell, UilEnvelopeAlt } from '@iconscout/react-unicons';
import {assets} from './images/assets'

const Sidebar = () => {
  return (
    <div className="left">
      <a className="profile" href="#">
        <div className="profile-photo">
          <img src={assets.profile7} alt="Profile" />
        </div>
        <div className="handle">
          <h4>Anu</h4>
          <p className="text-muted">@anu</p>
        </div>
      </a>
    
    <div className="sidebar">
      <a className="menu-item active">
        <span><i className="uil uil-home"><UilHome/></i></span>
        <h3>Home</h3>
      </a>
      <a className="menu-item">
        <span><i className="uil uil-compass"><UilCompass/></i></span>
        <h3>Explore</h3>
      </a>
      <a className="menu-item">
        <span><i className="uil uil-bell"><UilBell/><small className="notification-count">4+</small></i></span>
        <h3>Notification</h3>
        {/* Notification popup */}
        <div className="notifications-popup">
          {/* Add notification items here */}
        </div>
      </a>
      <a className="menu-item" id="messages-notification">
        <span><i className="uil uil-envelope-alt"><UilEnvelopeAlt/><small className="notification-count">6+</small></i></span>
        <h3>Messages</h3>
      </a>
      {/* Add more menu items */}
    </div>
    </div>
  );
};

export default Sidebar;
