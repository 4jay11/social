import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Stories from './components/Stories';
import CreatePost from './components/CreatePost';
import Feed from './components/Feed';
import Messages from './components/Messages';
import FriendRequests from './components/FriendRequests';
import ThemeCustomizer from './components/ThemeCustomizer';
import './components/App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <div className="container">
          <div className="left">
            <Sidebar />
            <label htmlFor="create-post" className="btn btn-primary">Create Post</label>
          </div>
          <div className="middle">
            <Stories />
            <CreatePost />
            <Feed />
          </div>
          <div className="right">
            <Messages />
            <FriendRequests />
          </div>
        </div>
      </main>
      <ThemeCustomizer />
    </div>
  );
};

export default App;
