import React from 'react';


const CreatePost = ({currentUser}) => {
  return (
    <form action="" className="create-post">
      <div className="profile-photo">
        <img src={currentUser.profile_image} alt="Profile" />
      </div>
      <input type="text" placeholder="What's on your mind?" id="create-post" />
      <input type="submit" value="Post" className="btn btn-primary" />
    </form>
  );
};

export default CreatePost;
