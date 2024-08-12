import React from 'react';
import { assets } from './images/assets';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };
  return (
    <nav>
      <div className="container">
        <h2 className="log">Social</h2>

        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input type="search" placeholder="Search for creators, inspirations, and projects" />
        </div>
        <div className="create">
          <label className="btn btn-primary" onClick={handleUploadClick} htmlFor="create-post">Create</label>
          <div className="profile-photo">
            <img onClick={handleProfileClick} src={assets.profile7} alt="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
