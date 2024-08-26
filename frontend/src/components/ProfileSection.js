import React, { useEffect } from "react";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProfileSection = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const {id}=useParams();
  console.log(id);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/user/`+id);
        setCurrentUser(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);

  // Destructure
  const { stories, posts } = currentUser || { stories: [], posts: [] };
  const cloudinaryLink = process.env.REACT_APP_CLOUDINARY_LINK;

  return (
    <div>
      {currentUser ? (
        <>
          <Navbar currentUser={currentUser} />
          <div className="main">
            <div className="container">
              <div className="left">
                <ProfileCard currentUser={currentUser} />
              </div>
              <div className="right">
                <p>Highlights</p>
                <div className="highlights">
                  {stories.map((story) => (
                    <div className="feed-pic" key={story.id}>
                      <img src={cloudinaryLink+story.image_url} alt={`Story ${story.id}`} />
                    </div>
                  ))}
                </div>
                <p>Posts</p>
                <div className="book-container">
                  {posts.map((post) => (
                    <div className="book-list" key={post.id}>
                      <div className="photo">
                        <img src={cloudinaryLink+post.image_url} alt={`Post ${post.id}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileSection;
