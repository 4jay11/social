import React from 'react';


const Messages = () => {
  return (
    <div className="messages">
      <div className="heading">
        <h4>Messages <i className="uil uil-edit"></i></h4>
      </div>
      {/* Search Bar */}
      <div className="search-bar">
        <i className="uil uil-search"></i>
        <input type="search" placeholder="Search Messages" id="message-search" />
      </div>
      {/* Messages categories */}
      <div className="category">
        <h6 className="active">Primary</h6>
        <h6>General</h6>
        <h6 className="message-requests">Request(7)</h6>
      </div>
      {/* Add message items */}
    </div>
  );
};

export default Messages;
