import React, { useState } from "react";
import "./Profile.css";
import { assets } from "./images/assets"; // Path to your default image
import { UilEdit } from "@iconscout/react-unicons";
import Navbar from "./Navbar";

const Profile = ({ currentUser }) => {
  const [profileImage, setProfileImage] = useState(currentUser.profile_image);
  const [description, setDescription] = useState(currentUser.description);
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
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
    <div>
      <Navbar currentUser={currentUser} />
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
                <button
                  onClick={handleRemoveImage}
                  className="remove-image-button"
                >
                  Remove Picture
                </button>
                <button
                  onClick={handleEditToggle}
                  className="edit-profile-button editing"
                >
                  SaveChanges
                </button>
              </>
            )}
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
                <h1>
                  {username}{" "}
                  <UilEdit onClick={handleEditToggle} className="edit" />
                </h1>
                <p>{name}</p>
              </>
            )}
            <div className="profile-stats">
              <span>Posts: {currentUser?.posts?.length}</span>
              <span>Following: {currentUser?.following?.length}</span>
              <span>Followers: {currentUser?.followers?.length}</span>
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
    </div>
  );
};

export default Profile;
