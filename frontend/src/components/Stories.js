import React from 'react';


const Stories = () => {
  return (
    <div className="stories">
      {/* Map through story data here */}
      <div className="story">
        <div className="profile-photo">
          <img src="./images/profile-8.jpg" alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src="./images/profile-8.jpg" alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src="./images/profile-8.jpg" alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src="./images/profile-8.jpg" alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      <div className="story">
        <div className="profile-photo">
          <img src="./images/profile-8.jpg" alt="Story" />
        </div>
        <p className="name">Your Story</p>
      </div>
      {/* Add more stories */}
    </div>
  );
};

export default Stories;
