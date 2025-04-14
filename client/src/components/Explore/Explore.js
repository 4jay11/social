import React, { useEffect, useState } from "react";
import "./Explore.css";
import ExploreCard from "./ExploreCard";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import FeedTemplate from "../Feed/FeedTemplate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { assets } from "../images/assets";
import StickySidebar from "../Sidebar/StickySidebar";

const Explore = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [explorePosts, setExplorePosts] = useState([]);
  const [showFeedPopup, setShowFeedPopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  useEffect(() => {
    const fetchExplore = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/post/post-generator",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setExplorePosts(response.data || []);
      } catch (err) {
        console.error("Error fetching Explore:", err.message);
      }
    };

    fetchExplore();
  }, [refreshTrigger]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? explorePosts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % explorePosts.length);
  };

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
      if (res.status === 200 || res.status === 201) {
        setRefreshTrigger((prev) => !prev);
      }
    } catch (err) {
      console.log(err.message);
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
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectedPost = explorePosts[currentIndex];

  return (
    <div className="book">
      <Navbar />
      <div className="bookmark-page" style={{ marginTop: "80px" }}>
        <div className="left">
          <StickySidebar />
        </div>
        <div className="right">
          <div className="book-title">
            <h1 className="bookmarks">Explore</h1>
          </div>
          <div className="explore-container">
            {explorePosts.length ? (
              explorePosts.map((post, index) => (
                <ExploreCard
                  key={post._id}
                  bookmarkPhoto={post.image}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowFeedPopup(true);
                  }}
                />
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>

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

              <button className="arrow left" onClick={handlePrev}>
                <FaArrowLeft />
              </button>

              <FeedTemplate
                key={selectedPost._id}
                user_id={selectedPost.userId?._id}
                post_id={selectedPost._id}
                profilePhoto={
                  selectedPost.userId?.profilePicture || assets.profile7
                }
                username={selectedPost.userId?.username || "Unknown"}
                location={selectedPost.location || "Unknown Location"}
                timeAgo={formatDistanceToNow(parseISO(selectedPost.createdAt), {
                  addSuffix: true,
                })}
                feedPhoto={selectedPost.image}
                likedBy={selectedPost.likes || []}
                bookmarkBy={selectedPost.bookmarks || []}
                caption={selectedPost.content}
                onBookmark={handleBookmark}
                onLike={handleLike}
              />

              <button className="arrow right" onClick={handleNext}>
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
