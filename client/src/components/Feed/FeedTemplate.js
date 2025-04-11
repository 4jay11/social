  import React, { useState, useEffect } from "react";
  import {
    UilBookmarkFull,
    UilHeart,
    UilCommentDots,
    UilTimes,
  } from "@iconscout/react-unicons";
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { assets } from "../images/assets";

  const FeedTemplate = ({
    profilePhoto,
    user_id,
    post_id,
    username = "Unknown User",
    location = "Unknown Location",
    timeAgo,
    feedPhoto,
    caption = "No caption",
    likedBy = [],
    onLike,
    onBookmark,
    bookmarkBy = [],
  }) => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.auth.user?._id);

    const hasLiked = likedBy.some((user) => user._id === userId);
    const hasBookmarked = bookmarkBy.includes(userId);

    const [showHighlight, setShowHighlight] = useState(false);
    const [expandedComments, setExpandedComments] = useState({});
    
    const dummyComments = [
      {
        id: 1,
        profileImage: assets.profile1,
        username: "ajay_dev",
        comment: "Amazing shot! 🔥",
      },
      {
        id: 2,
        profileImage: assets.profile2,
        username: "neha_singh",
        comment:
          "This view is so peaceful. I can sit here all day just staring at this!",
      },
      {
        id: 3,
        profileImage: assets.profile3,
        username: "ravi_j",
        comment: "Awesome bro!",
      },
      {
        id: 4,
        profileImage: assets.profile4,
        username: "shruti",
        comment:
          "Love this ❤️. The colors, the vibe, everything about this post is just stunning.",
      },
    ];

    useEffect(() => {
      
      if (showHighlight) {
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.classList.add("modal-open");
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
        document.body.classList.remove("modal-open");
      }

      const handleEsc = (e) => {
        if (e.key === "Escape") {
          setShowHighlight(false);
        }
      };

      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }, [showHighlight]);

    const PostContent = () => (
      <div className="feed">
        <div className="head">
          <div className="user">
            <div className="profile-pic">
              <img
                onClick={() => navigate(`/profile/${user_id}`)}
                src={profilePhoto}
                alt={username}
              />
            </div>
            <div className="info">
              <h3>{username}</h3>
              <small>{`${location}, ${timeAgo}`}</small>
            </div>
          </div>
        </div>

        <div className="photo">
          <img src={feedPhoto} alt="Feed" />
        </div>

        <div className="action-buttons">
          <div style={{ display: "flex", gap: "10px", padding: "5px 0" }}>
            <UilHeart
              color="black"
              fill={hasLiked ? "red" : "black"}
              onClick={() => onLike(post_id)}
              style={{ cursor: "pointer" }}
            />
            <UilCommentDots
              onClick={() => setShowHighlight(true)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="bookmark">
            <UilBookmarkFull
              color="black"
              fill={hasBookmarked ? "red" : "black"}
              onClick={() => onBookmark(post_id)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="liked-by">
          {likedBy.length > 0 ? (
            <>
              {likedBy.slice(0, 3).map((user, index) => (
                <span key={index}>
                  <img
                    src={user?.profilePicture || assets.profile8}
                    alt={user?.username || "liked user"}
                  />
                </span>
              ))}
              <p>
                Liked by <b>{likedBy[0]?.username || "someone"}</b>{" "}
                {likedBy.length > 1 && `and ${likedBy.length - 1} others`}
              </p>
            </>
          ) : (
            <p>No likes yet</p>
          )}
        </div>

        <div className="caption">
          <p>{caption}</p>
        </div>

        <div
          className="comments text-muted"
          onClick={() => setShowHighlight(true)}
          style={{ cursor: "pointer" }}
        >
          View all comments
        </div>
      </div>
    );

    const renderComments = () => {
      return (
        <div class="right-comments">
          <div className="top-comments">
            <h3>Comments</h3>
          </div>
          <div class="comments-scrollable">
            <div className="comments-section">
              {dummyComments.map((comment) => {
                const isLong = comment.comment.length > 60;
                const isExpanded = expandedComments[comment.id];

                return (
                  <div className="comment" key={comment.id}>
                    <img
                      className="comment-img"
                      src={comment.profileImage}
                      alt={comment.username}
                    />
                    <div className="comment-content">
                      <strong>{comment.username} </strong>
                      {isLong && !isExpanded
                        ? `${comment.comment.slice(0, 60)}... `
                        : comment.comment}
                      {isLong && (
                        <span
                          onClick={() =>
                            setExpandedComments((prev) => ({
                              ...prev,
                              [comment.id]: !prev[comment.id],
                            }))
                          }
                          style={{
                            color: "#007bff",
                            cursor: "pointer",
                            marginLeft: "6px",
                          }}
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Sticky Comment Input */}
          <div className="comment-box">
            <textarea
              placeholder="Write a comment..."
              rows="3"
              className="comment-input"
            ></textarea>
            <button className="comment-submit">Post</button>
          </div>
        </div>
      );
    };

    return (
      <>
        <PostContent />
        {showHighlight && (
          <div className="overlay">
            <div className="overlay-content split-view">
              <button
                className="close-btn"
                onClick={() => setShowHighlight(false)}
              >
                <UilTimes size="24" color="black" />
              </button>
              <div className="left-post">{PostContent()}</div>
              <div className="right-comments">{renderComments()}</div>
            </div>
          </div>
        )}
      </>
    );
  };

  export default FeedTemplate;
