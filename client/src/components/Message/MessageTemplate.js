import React from 'react';
const MessageTemplate = ({ profilePhoto, name, messageText, isActive }) => {
  return (
    <div className="message">
    <div className={`profile-photo ${isActive ? 'active' : ''}`}>
      <img src={profilePhoto} alt={name} />
      {isActive && <div className="active"></div>}
    </div>
    <div className="message-body">
      <h5>{name}</h5>
      <p className="text-muted">{messageText}</p>
    </div>
  </div>
  );
};

export default MessageTemplate;
