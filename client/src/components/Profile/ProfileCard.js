import React from "react";
import "./ProfileSection.css";
import {
  UilEdit,
  UilFileAlt,
  UilUserPlus,
  UilUsersAlt,
} from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ currentUser , posts }) => {
  const cloudinaryLink = process.env.REACT_APP_CLOUDINARY_LINK;
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log("Edit button clicked");
    navigate("/profile")
  };

  // Ensure safe destructuring with fallback values
  const {
    username = "Unknown",
    bio = "No bio available",
    profilePicture = "",
  } = currentUser || {};

  return (
    <div className="profile-card">
      <div className="image">
        <img
          src={profilePicture}
          alt="profile"
          className="profile-img"
        />
      </div>
      <div className="text-data">
        <span className="idd text-muted">
          {username} <UilEdit className="id" onClick={handleEdit} />
        </span>
        <span className="name">{username}</span>
        <span className="oneline">{bio}</span>
      </div>
      <div className="buttons">
        <button className="button">Follow</button>
        <button className="button">Message</button>
      </div>
      <div className="stats">
        <div className="data">
          <i>
            <UilFileAlt />
          </i>
          <span>{posts?.length || 0}</span>
        </div>
        <div className="data">
          <i>
            <UilUserPlus />
          </i>
          <span>{currentUser?.following?.length || 0}</span>
        </div>
        <div className="data">
          <i>
            <UilUsersAlt />
          </i>
          <span>{currentUser?.followers?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
