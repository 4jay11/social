import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories';
import CreatePost from './components/CreatePost';

import Messages from './components/Messages';

import ThemeCustomizer from './components/ThemeCustomizer';
import './components/App.css';
import Feeds from './components/Feeds';
import FriendRequestsTemplate from './components/FriendRequestsTemplate';
import {users} from './jsonData/data'
import axios from 'axios';
const App = () => {
  const currentUserId = users[0];
  const [currentUser, setCurrentUser] = React.useState(currentUserId);
  const [followingPosts, setfollowingPosts] = React.useState([]);
console.log(currentUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/1`);
        setCurrentUser(response.data);
        
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      <main>
        <div className="container">
          <div className="left">
            <Sidebar name={currentUser.name} profilePhoto={process.env.REACT_APP_CLOUDINARY_LINK + currentUser.profile_image} user_name={currentUser.username} />
            <label htmlFor="create-post" className="btn btn-primary">Create Post</label>
          </div>
          <div className="middle">
            <Stories />
            <CreatePost currentUser={currentUser} />
            <Feeds currentUser={currentUser} />
          </div>
          <div className="right">
            {/* <Messages /> */}
            <FriendRequestsTemplate currentUser={currentUser} />
          </div>
        </div>
      </main>
      <ThemeCustomizer />
    </div>
  );
};

export default App;
