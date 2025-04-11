import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/authSlice';
import { useSelector } from 'react-redux';
import './Navbar.css';
const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const id = currentUser._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleHomeClick = () => {
    navigate('/');
  };

  const handleUploadClick = () => {
    navigate('/upload');
  };
  const handleProfileClick = () => {
    navigate('/profile/'+id);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav>
      <div className="container">
        <h2 className="log" onClick={handleHomeClick}>
          Social
        </h2>

        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search for creators, inspirations, and projects"
          />
        </div>
        <div className="create">
          <label
            className="btn btn-primary"
            onClick={handleLogout}
            htmlFor="create-post"
          >
            Logout
          </label>
          <div className="profile-photo">
            {/* <img onClick={handleProfileClick} src={process.env.REACT_APP_CLOUDINARY_LINK+currentUser.profile_image} alt="Profile" /> */}
            <img
              onClick={handleProfileClick}
              src={currentUser.profilePicture}
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
