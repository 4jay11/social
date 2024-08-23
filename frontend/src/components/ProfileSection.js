import React, { useEffect } from "react";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard";
import axios from "axios";

const ProfileSection = () => {
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/user/1`);
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
                      <img src={story.image_url} alt={`Story ${story.id}`} />
                    </div>
                  ))}
                </div>
                <p>Posts</p>
                <div className="book-container">
                  {posts.map((post) => (
                    <div className="book-list" key={post.id}>
                      <div className="photo">
                        <img src={post.image_url} alt={`Post ${post.id}`} />
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
