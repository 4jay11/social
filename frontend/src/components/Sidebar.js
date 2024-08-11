import React from 'react';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <a className="menu-item active">
        <span><i className="uil uil-home"></i></span>
        <h3>Home</h3>
      </a>
      <a className="menu-item">
        <span><i className="uil uil-compass"></i></span>
        <h3>Explore</h3>
      </a>
      <a className="menu-item">
        <span><i className="uil uil-bell"><small className="notification-count">4+</small></i></span>
        <h3>Notification</h3>
        {/* Notification popup */}
        <div className="notifications-popup">
          {/* Add notification items here */}
        </div>
      </a>
      <a className="menu-item" id="messages-notification">
        <span><i className="uil uil-envelope-alt"><small className="notification-count">6+</small></i></span>
        <h3>Messages</h3>
      </a>
      {/* Add more menu items */}
    </div>
  );
};

export default Sidebar;
