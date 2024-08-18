import React from 'react';
import { assets } from './images/assets';

const FriendRequests = ({ profilePhoto, name,mutual }) => {
  return (
    <div className="friend-requests">
      <div>
      
      {/* Map through friend requests here */}
      <div className="request">
        <div className="info">
          <div className="profile-photo">
            <img src={profilePhoto} alt="Profile" />
          </div>
          <div>
            <h5>{name}</h5>
            <p className="text-muted">{mutual} mutual friends</p>
          </div>
        </div>
        <div className="action">
          <button className="btn btn-primary">Accept</button>
          <button className="btn">Decline</button>
        </div>
      </div>
      
      {/* Add more requests */}
    </div>
    </div>
  );
};

export default FriendRequests;
