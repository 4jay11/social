import React, { useState, useEffect } from "react";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import axios from "axios";
import PostContent from "./PostContent";
import PostComments from "./PostComments";

const FeedCard = (props) => {
  const {
    profilePhoto,
    user_id,
    post_id,
    username,
    location,
    timeAgo,
    feedPhoto,
    caption,
    likedBy,
    onLike,
    onBookmark,
    bookmarkBy,
    editable,
    handlePostDelete,
    handlePostEdit,
  } = props;

  const userId = useSelector((state) => state.auth.user?._id);
  const [newComment, setNewComment] = useState("");
  const [showHighlight, setShowHighlight] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(caption);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/post/comments/${post_id}`,
          {
            withCredentials: true,
          }
        );
        setComments(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchComments();
  }, [post_id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:8000/post-reaction/comment/${post_id}`,
        { text: newComment },
        { withCredentials: true }
      );
      setComments((prev) => [...prev, res.data.comment]);
      setNewComment("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/post-reaction/comment/${id}`, {
        withCredentials: true,
      });
      setComments((prevComments) => prevComments.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete comment:", err.message);
    }
  };

  const Post = <PostContent
        {...{
          profilePhoto,
          user_id,
          username,
          location,
          timeAgo,
          feedPhoto,
          likedBy,
          onLike,
          onBookmark,
          post_id,
          bookmarkBy,
          editable,
          isEditing,
          setIsEditing,
          editedCaption,
          setEditedCaption,
          handlePostDelete,
          handlePostEdit,
          caption,
          setShowHighlight,
        }}
      />

  return (
    <>
      {Post}
      {showHighlight && (
        <div className="overlay">
          <div className="overlay-content split-view">
            <button
              className="close-btn"
              onClick={() => setShowHighlight(false)}
            >
              <UilTimes size="24" color="black" />
            </button>
            <div className="left-post">{Post}</div>
            <PostComments
              {...{
                comments,
                expandedComments,
                setExpandedComments,
                userId,
                handleDelete,
                newComment,
                setNewComment,
                handleCommentSubmit,
                post_id,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FeedCard;