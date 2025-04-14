import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Stories from "./components/Stories/Stories";
import CreatePost from "./components/Post/CreatePost";
import Messages from "./components/Message/Messages";
import "./components/App.css";
import Feeds from "./components/Feed/Feeds";
import FriendRequestsTemplate from "./components/FriendRequest/FriendRequestsTemplate";
import { users } from "./jsonData/data";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import StickySidebar from "./components/Sidebar/StickySidebar";
const App = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/upload")
  }
  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      <main>
        <div className="container">
          <div className="left">
            <Sidebar currentUser={currentUser} />
            <label
              onClick={handleUpload}
              htmlFor="create-post"
              className="btn btn-primary"
            >
              Create Post
            </label>
          </div>
          <div className="middle">
            <div className="story">
              <Stories />
            </div>
            <CreatePost />
            <div className="feed">
              <Feeds currentUser={currentUser} />
            </div>
          </div>
          <div className="right">
            {/* <Messages /> */}
            <FriendRequestsTemplate currentUser={currentUser} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
