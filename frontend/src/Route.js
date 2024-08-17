import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import UploadPost from './components/UploadPost';
import Profile from './components/Profile';
import Bookmarks from './components/Bookmarks';

const Routee = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmark" element={<Bookmarks />} />
      </Routes>
    </Router>
  );
}

export default Routee;
