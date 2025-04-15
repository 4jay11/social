import React, { useState, useEffect } from "react";
 import { FaTrashAlt } from "react-icons/fa";
import {
  UilBookmarkFull,
  UilHeart,
  UilCommentDots,
  UilTimes,
} from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../images/assets";
import axios from "axios";

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
  const [newComment, setNewComment] = useState("");
  const [showHighlight, setShowHighlight] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/post-reaction/comment/${postId}`,
        { text: newComment },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.comment);

      setComments((prev) => [...prev, res.data.comment]);
      // fetchComments(postId);
      setNewComment("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/post-reaction/comment/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Comment deleted successfully");

      // Remove the comment from UI
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete comment:", err.message);
    }
  };


  const fetchComments = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/post/comments/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComments(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchComments(post_id);
  }, [post_id]);

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
              style={{ cursor: "pointer" }}
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



 const renderComments = () => (
   <div className="right-comments">
     <div className="top-comments">
       <h3>Comments</h3>
     </div>
     <div className="comments-scrollable">
       <div className="comments-section">
         {comments.map((comment) => {
           const text = comment?.text || ""; // Fallback to empty string
           const isLong = text.length > 60;
           const isExpanded = expandedComments[comment._id];

           return (
             <>
               <div
                 className="comment"
                 key={comment._id}
                 style={{ position: "relative" }}
               >
                 <img
                   className="comment-img"
                   src={comment.userId?.profilePicture}
                   alt={comment.userId?.username}
                 />
                 <div className="comment-content">
                   <strong>{comment.userId?.username} </strong>
                   {isLong && !isExpanded ? `${text.slice(0, 60)}... ` : text}
                   {isLong && (
                     <span
                       onClick={() =>
                         setExpandedComments((prev) => ({
                           ...prev,
                           [comment._id]: !prev[comment._id],
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

                 {/* Show Delete Icon only if comment's userId matches current user */}
                 {comment.userId?._id === userId && (
                   <div
                     className="deleteIcon"
                     onClick={() => handleDelete(comment._id)}
                   >
                     <FaTrashAlt />
                   </div>
                 )}
               </div>
             </>
           );
         })}
       </div>
     </div>
     <div className="comment-box">
       <textarea
         placeholder="Write a comment..."
         rows="3"
         className="comment-input"
         value={newComment}
         onChange={(e) => setNewComment(e.target.value)}
       ></textarea>
       <button
         className="comment-submit"
         onClick={() => handleCommentSubmit(post_id)}
       >
         Post
       </button>
     </div>
   </div>
 );


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
