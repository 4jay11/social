import React, { useEffect } from "react";
import "./Bookmarks.css";
import BookmarksTemplate from "./BookmarksTemplate";
import { users } from "../jsonData/data";
import axios from "axios";
import Navbar from "./Navbar";
const Bookmarks = ({currentUser}) => {
  const [currentUse, setCurrentUser] = React.useState(currentUser);
  const [followingPosts, setfollowingPosts] = React.useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/1`);
        setCurrentUser(response.data);
        const res = await axios.get(`http://127.0.0.1:8000/api/fp/1`);
        setfollowingPosts(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);
  const searchUserId = currentUse.user_id; // User ID for whom you want to display bookmarks
const all=[...[currentUse],...followingPosts]
console.log(all[0]);

  
  
  // Find the user by ID
  // const user = users.find((user) => user.user_id === searchUserId);
  const user = all[0]


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
      const matchingPost = all.flatMap(otherUser => otherUser.posts).find(post => post.post_id === bookmarkPostId);
      if (matchingPost) {
        bookmarkedImages.push(matchingPost.image_url);
      }
    });
  });

  return (
    <div className="book">
      <Navbar currentUser={currentUser}/>
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
