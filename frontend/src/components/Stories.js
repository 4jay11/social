import React from 'react';
import { assets } from './images/assets';

const Stories = () => {
  return (
    <div className="stories">
      {/* Map through story data here */}
      <div className="story">
        <div className="profile-photo">
          <img src={assets.profile8} alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src={assets.profile8} alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src={assets.profile8} alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src={assets.profile8} alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src={assets.profile8} alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      {/* Add more stories */}
    </div>
  );
};

export default Stories;
