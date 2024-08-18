import React from "react";
import "./Bookmarks.css";
import BookmarksTemplate from "./BookmarksTemplate";
import { users } from "../jsonData/data";

const Bookmarks = () => {
  const searchUserId = "1"; // User ID for whom you want to display bookmarks

  // Find the user by ID
  const user = users.find((user) => user.user_id === searchUserId);

  // Ensure user exists and has savedPosts
  const savedPosts = user ? user.savedPosts : [];

  // Initialize an array to store the bookmarked image URLs
  let bookmarkedImages = [];

  // Iterate through savedPosts
  savedPosts.forEach((savedPost) => {
    // Ensure bookmarkPhoto is always an array
    const bookmarkPhotoArray = Array.isArray(savedPost.bookmarkPhoto)
      ? savedPost.bookmarkPhoto
      : [savedPost.bookmarkPhoto];

    // Find matching posts from all users by bookmarkPhoto IDs
    bookmarkPhotoArray.forEach((bookmarkPostId) => {
      users.forEach((otherUser) => {
        const matchingPost = otherUser.posts.find((post) => post.post_id === bookmarkPostId);
        if (matchingPost) {
          bookmarkedImages.push(matchingPost.image_url);
        }
      });
    });
  });

  return (
    <div className="book">
      <h1 className="bookmarks">Bookmarks</h1>
      <div className="bookmark-container">
        {bookmarkedImages.length > 0 ? (
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
