import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login/Login";
import Register from "./components/Login/Register"; 
import App from "./App";
import UploadPost from "./components/Post/UploadPost";
import Profile from "./components/Profile/Profile";
import Bookmarks from "./components/Bookmark/Bookmarks";
import ProfileSection from "./components/Profile/ProfileSection";
import Cloudinary from "./components/Cloudinary";
import SecureUpload from "./components/SecureUpload";
import ProtectedRoute from "./utils/ProtectedRoute";
import StoryView from "./components/Stories/StoryView";
import { MessagePage } from "./components/Message/MessagePage";
import Chat from "./components/Chat";
import Explore from "./components/Explore/Explore";
// import { PostScroll } from "./components/Feed/PostScroll";

const Routee = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <Navigate to="/feed" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/feed" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/feed" />}
        />
        
        <Route
          path="/forgot-password"
          element={
            !isAuthenticated ? (
              <div>Forgot Password Page</div>
            ) : (
              <Navigate to="/feed" />
            )
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<App />} />
          <Route path="/profile/:id" element={<ProfileSection />} />
          <Route path="/upload" element={<UploadPost />} />
          <Route path="/bookmark" element={<Bookmarks />} />
          <Route path="/cloudinary" element={<Cloudinary />} />
          <Route path="/secure-upload" element={<SecureUpload />} />
          <Route path="/storyView/:id" element={<StoryView />} />
          <Route path="/messagePage" element={<MessagePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:targetUserId?" element={<Chat />} />
          {/* <Route path="/postScroll" element={<PostScroll />} /> */}
        </Route>

        {/* Catch-all Route */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/feed" : "/"} />}
        />
      </Routes>
    </Router>
  );
};

export default Routee;
