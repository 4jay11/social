import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const PostComments = ({
  comments,
  expandedComments,
  setExpandedComments,
  userId,
  handleDelete,
  newComment,
  setNewComment,
  handleCommentSubmit,
  post_id,
}) => {
  return (
    <div className="right-comments">
      <div className="top-comments">
        <h3>Comments</h3>
      </div>
      <div className="comments-scrollable">
        <div className="comments-section">
          {comments.map((comment) => {
            const text = comment?.text || "";
            const isLong = text.length > 60;
            const isExpanded = expandedComments[comment._id];

            return (
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
                  <strong>{comment.userId?.username}</strong>{" "}
                  {isLong && !isExpanded ? `${text.slice(0, 60)}...` : text}
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
                {comment.userId?._id === userId && (
                  <div
                    className="deleteIcon"
                    onClick={() => handleDelete(comment._id)}
                  >
                    <FaTrashAlt />
                  </div>
                )}
              </div>
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
};

export default PostComments;