import React from 'react';
import { assets } from './images/assets';

const FriendRequests = ({ profilePhoto, name }) => {
  return (
    <div className="friend-requests">
      <div>
      <h4>Request</h4>
      {/* Map through friend requests here */}
      <div className="request">
        <div className="info">
          <div className="profile-photo">
            <img src={assets.profile6} alt="Profile" />
          </div>
          <div>
            <h5>Gayu</h5>
            <p className="text-muted">5 mutual friends</p>
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
