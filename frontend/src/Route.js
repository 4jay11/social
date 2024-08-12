import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import UploadPost from './components/UploadPost';
import Profile from './components/Profile';

const Routee = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default Routee;
