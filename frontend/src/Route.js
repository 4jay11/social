import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import UploadPost from './components/UploadPost';
import Profile from './components/Profile';
import Bookmarks from './components/Bookmarks';
import {users} from './jsonData/data'
import ProfileCard from './components/ProfileCard';
import ProfileSection from './components/ProfileSection';
import Cloudinary from './components/Cloudinary';
import SecureUpload from './components/SecureUpload';


const Routee = () => {
  const currentUser=users[0] || {};
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/profile" element={<ProfileSection currentUser={currentUser}/>} />  
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/pro" element={<Profile currentUser={currentUser} />} />
        <Route path="/bookmark" element={<Bookmarks currentUser={currentUser}/>} />
        <Route path="/cloudinary" element={<Cloudinary currentUser={currentUser}/>} />
        <Route path="/secure-upload" element={<SecureUpload currentUser={currentUser}/>} />
     

      </Routes>
    </Router>
  );
}

export default Routee;
