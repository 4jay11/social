import React from 'react';


const FriendRequests = () => {
  return (
    <div className="friend-requests">
      <h4>Request</h4>
      {/* Map through friend requests here */}
      <div className="request">
        <div className="info">
          <div className="profile-photo">
            <img src="./images/profile-14.jpg" alt="Profile" />
          </div>
          <div>
            <h5>Nick Jonas</h5>
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
  );
};

export default FriendRequests;
