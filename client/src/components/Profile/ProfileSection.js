import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import ProfileCard from "./ProfileCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import FeedTemplate from "../Feed/FeedTemplate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { assets } from "../images/assets";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./ProfileSection.css";

const ProfileSection = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showFeedPopup, setShowFeedPopup] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [stories, setStories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${id}`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setCurrentUser(response.data.user);
        setPosts(response.data.posts);
        setStories(response.data.stories);
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };
    fetchUser();
  }, [id, refreshTrigger]);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/post-reaction/like/${postId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setRefreshTrigger((prev) => !prev);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  const handleBookmark = async (postId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/post-reaction/bookmark/${postId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200 || res.status === 201) {
        setRefreshTrigger((prev) => !prev);
      }
    } catch (error) {
      console.error("Error Bookmarking post:", error);
    }
  };

  const cloudinaryLink = process.env.REACT_APP_CLOUDINARY_LINK;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
  };

  const selectedPost = posts[currentIndex];

  return (
    <div>
      {currentUser ? (
        <>
          <Navbar currentUser={currentUser} />
          <div className="main">
            <div className="container">
              <div className="left">
                <ProfileCard currentUser={currentUser} posts={posts} />
              </div>
              <div className="right">
                <p>Highlights</p>
                <div className="highlights">
                  {stories.length > 0 ? (
                    stories.map((story) => (
                      <div className="feed-pic" key={story._id}>
                        <img 
                          src={story.image}
                          alt={`Story ${story._id}`}
                        />
                      </div>
                    ))
                  ) : (
                    <p>No stories available</p>
                  )}
                </div>
                <p>Posts</p>
                <div className="book-container">
                  {posts.length > 0 ? (
                    posts.map((post, index) => (
                      <div
                        className="book-list"
                        key={post._id}
                        onClick={() => {
                          setCurrentIndex(index);
                          setShowFeedPopup(true);
                        }}
                      >
                        <div className="photo">
                          <img src={post.image} alt={`Post ${post._id}`} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No posts available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Feed Popup Overlay */}
          {showFeedPopup && selectedPost && (
            <div className="feed-popup-overlay">
              <div className="feed-popup-content">
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowFeedPopup(false);
                    setCurrentIndex(null);
                  }}
                >
                  ✖
                </button>

                {/* Prev and Next Arrows */}
                <button className="arrow left" onClick={handlePrev}>
                  <FaArrowLeft />
                </button>

                <FeedTemplate
                  key={selectedPost._id}
                  user_id={currentUser?._id}
                  post_id={selectedPost._id}
                  profilePhoto={currentUser?.profilePicture || assets.profile7}
                  username={currentUser?.username || "Unknown User"}
                  location={selectedPost.location || "Unknown Location"}
                  timeAgo={formatDistanceToNow(
                    parseISO(selectedPost.createdAt),
                    {
                      addSuffix: true,
                    }
                  )}
                  feedPhoto={selectedPost.image || assets.feed1}
                  likedBy={selectedPost.likes || []}
                  bookmarkBy={selectedPost.bookmarks || []}
                  caption={selectedPost.content || "No caption"}
                  onBookmark={handleBookmark}
                  onLike={handleLike}
                />

                <button className="arrow right" onClick={handleNext}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileSection;
