import React from "react";
import "./Bookmarks.css";
import BookmarksTemplate from "./BookmarksTemplate";
import { assets } from "./images/assets";
import { users } from "../jsonData/data";

const Bookmarks = () => {
  // Assuming you want to search for a person by ID, e.g., user_id "1"
  const searchUserId = "1"; // Change this as needed
  // all users
  const allUsers = users;
  // Find the user by ID
  const user = users.find((user) => user.user_id === searchUserId);

  // Ensure user exists and has savedPosts
  const savedPosts = user ? user.savedPosts : [];

  // Filter the user id separately from the savedPosts
  const savedPostIds = user ? user.savedPosts.map((post) => post.id) : [];
  console.log(savedPostIds);

  // filter the post bookmarked photo separately from the savedPosts
  const savedPostBookmarks = user
    ? user.savedPosts.map((post) => post.bookmarkPhoto)
    : [];
  console.log(savedPostBookmarks);

  // Display all the user data using the savedPostsIds from allUser using map
  const filterdUsers = allUsers.filter((user) =>
    savedPostIds.includes(user.user_id)
  );
  console.log(filterdUsers);
  // Extract the image_url of the fillterdusers from the posts
  const filteredImage = filterdUsers.map((user) =>
    user.posts.map((post) => post.image_url)
  );
  console.log(filteredImage);

  return (
    <div className="book">
      <h1 className="bookmarks">Bookmarks</h1>
      <div className="bookmark">
        {filteredImage.map((image, index) => (
          <BookmarksTemplate key={index} bookmarkPhoto={image} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
