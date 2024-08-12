import React from 'react';
import { assets } from './images/assets';

const CreatePost = () => {
  return (
    <form action="" className="create-post">
      <div className="profile-photo">
        <img src={assets.profile7} alt="Profile" />
      </div>
      <input type="text" placeholder="What's on your mind?" id="create-post" />
      <input type="submit" value="Post" className="btn btn-primary" />
    </form>
  );
};

export default CreatePost;
