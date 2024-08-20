import React from "react";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";
import { assets } from "./images/assets";

const ProfileSection = ({ currentUser }) => {
  // Destructure currentUser for easier access to data
  const { posts, stories, name, profile_image, username } = currentUser;

  // Function to get the bookmarked post images
  

  return (
    <div>
      <Navbar currentUser={currentUser} />
      <div className="main">
        <div className="container">
          <div className="left">
            <ProfileCard currentUser={currentUser} />
          </div>
          <div className="right">
            <p>Highlights</p>
            <div className="highlights">
              
                {stories.map((story, index) => (
                 <div className="feed-pic"> <img key={index} src={story.image_url} alt={`Story ${index + 1}`} /></div>
                ))}
              
            </div>
            <p>Posts</p>
            <div className="book-container">
              {posts.map((post, index) => (
                <div className="book-list" key={index}>
                  <div className="photo">
                    <img src={post.image_url} alt={`Post ${index + 1}`} />
                  </div>
                </div>
              ))}
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
