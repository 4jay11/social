import React, { useState } from 'react';
import './Profile.css';
import { assets } from './images/assets'; // Path to your default image
import { UilBookmarkFull } from '@iconscout/react-unicons';

const Profile = () => {
  const [profileImage, setProfileImage] = useState(assets.profile8);
  const [description, setDescription] = useState("This is your description.");
  const [name, setName] = useState("Name");
  const [username, setUsername] = useState("Username");
  const [isEditing, setIsEditing] = useState(false);

  

 
  const handleRemoveImage = () => {
    setProfileImage(assets.profile7);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result); // set the selected image as profile image
        };
        reader.readAsDataURL(file);
    }
};
  return (
    <div className="profile-container">
      <div className="profile-head">
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" className="profile-image" />
          
          {isEditing && (
            <>
              <input 
                type="file" 
                id="imageUpload" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="file-input" 
              />
              <button onClick={handleRemoveImage} className="remove-image-button">Remove Picture</button>
              <button onClick={handleEditToggle} className="edit-profile-button editing">SaveChanges</button>

            </>
          )}
          {/* <button onClick={handleEditToggle} className={`edit-profile-button ${isEditing ? 'editing active' : ''}`}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button> */}
          
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input 
                type="text" 
                value={username} 
                onChange={handleUsernameChange} 
                className="edit-input" 
              />
              <input 
                type="text" 
                value={name} 
                onChange={handleNameChange} 
                className="edit-input" 
              />
              <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload-input"
                />
            </>
          ) : (
            <>
              <h1>{username} <UilBookmarkFull onClick={handleEditToggle} className="edit" /></h1>
              <p>{name}</p>
            </>
          )}
          <div className="profile-stats">
            <span>Posts: 12</span>
            <span>Following: 102</span>
            <span>Followers: 150</span>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <h2>About</h2>
        {isEditing ? (
          <textarea 
            value={description} 
            onChange={handleDescriptionChange} 
            className="edit-input" 
          />
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
