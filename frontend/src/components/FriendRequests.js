import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FriendRequests = ({ currentUserId, profilePhoto, name, mutual, id }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile/' + id);
  };

  const acceptRequest = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/${currentUserId}/accept-request`, { requestId: id });
      console.log('Friend request accepted:', response.data);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const declineRequest = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/${currentUserId}/decline-request`, { requestId: id });
      console.log('Friend request declined:', response.data);
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  return (
    <div className="friend-requests">
      <div className="request">
        <div className="info">
          <div className="profile-photo">
            <img onClick={handleProfileClick} src={profilePhoto} alt="Profile" />
          </div>
          <div>
            <h5>{name}</h5>
            <p className="text-muted">{mutual} mutual friends</p>
          </div>
        </div>
        <div className="action">
          <button className="btn btn-primary" onClick={acceptRequest}>Accept</button>
          <button className="btn" onClick={declineRequest}>Decline</button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
