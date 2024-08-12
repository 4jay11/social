import React from 'react';
import { assets } from './images/assets';

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <h2 className="log">Social</h2>

        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input type="search" placeholder="Search for creators, inspirations, and projects" />
        </div>
        <div className="create">
          <label className="btn btn-primary" htmlFor="create-post">Create</label>
          <div className="profile-photo">
            <img src={assets.profile7} alt="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
