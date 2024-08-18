import React from "react";
import "./Bookmarks.css";
import BookmarksTemplate from "./BookmarksTemplate";
import { users } from "../jsonData/data";
import Navbar from "./Navbar";
const Bookmarks = ({currentUser}) => {
  const searchUserId = currentUser.user_id; // User ID for whom you want to display bookmarks

  // Find the user by ID
  const user = users.find((user) => user.user_id === searchUserId);

  // Get saved posts, or an empty array if none exist
  const savedPosts = user?.savedPosts ?? [];

  // Initialize an array to store the bookmarked image URLs
  const bookmarkedImages = [];

  // Iterate through savedPosts and collect bookmarked images
  savedPosts.forEach((savedPost) => {
    const bookmarkPhotoArray = Array.isArray(savedPost.bookmarkPhoto)
      ? savedPost.bookmarkPhoto
      : [savedPost.bookmarkPhoto];

    bookmarkPhotoArray.forEach((bookmarkPostId) => {
      const matchingPost = users.flatMap(otherUser => otherUser.posts).find(post => post.post_id === bookmarkPostId);
      if (matchingPost) {
        bookmarkedImages.push(matchingPost.image_url);
      }
    });
  });

  return (
    <div className="book">
      <Navbar />
      <div className="book-title">
      <h1 className="bookmarks">Bookmarks</h1>
      </div>
      
      <div className="bookmark-container">
        {bookmarkedImages.length ? (
          bookmarkedImages.map((image, index) => (
            <BookmarksTemplate key={index} bookmarkPhoto={image} />
          ))
        ) : (
          <p>No bookmarks found</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
