import React, { useEffect, useState } from "react";
import "./Bookmarks.css";
import BookmarksTemplate from "./BookmarksTemplate";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import StickySidebar from "../Sidebar/StickySidebar";

const Bookmarks = ({ currentUser }) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/user/bookmark",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setBookmarkedPosts(response.data.posts || []);
      } catch (err) {
        console.error("Error fetching bookmarks:", err.message);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="book">
      <Navbar />
      <div className="bookmark-page" style={{ marginTop: "80px" }}>
        <div className="left">
          <StickySidebar  />
        </div>
        <div className="right">
          <div className="book-title">
            <h1 className="bookmarks">Bookmarks</h1>
          </div>
          <div className="bookmark-container">
            {bookmarkedPosts.length ? (
              bookmarkedPosts.map((post, index) => (
                <BookmarksTemplate key={post._id} bookmarkPhoto={post.image} />
              ))
            ) : (
              <p>No bookmarks found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
