import React, { useState, useEffect } from 'react';
import { UilEllipsisH, UilBookmarkFull, UilHeart, UilCommentDots, UilShareAlt } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed

const FeedTemplate = ({
  profilePhoto,
  user_id,
  username,
  location,
  timeAgo,
  feedPhoto,
  likedBy,
  likesCount,
  caption,
  commentsCount,
  likedName,
  mutualFollowers,
  randomFollowerName,
  mutualFollowerImages,
  post_id, // Add postId prop to uniquely identify each post
}) => {
  const [displayLikedBy, setDisplayLikedBy] = useState(true);
  const [showEditOptions, setShowEditOptions] = useState(false); // State to toggle edit options
  const [updatedCaption, setUpdatedCaption] = useState(caption); // State for updating caption
  const navigate = useNavigate();
  const cloudinaryLink = process.env.REACT_APP_CLOUDINARY_LINK;

  console.log(likedBy);
  
            
  useEffect(() => {
    setDisplayLikedBy(likedBy.length > 0);
  }, [likedBy]);

  const handleEditClick = () => {
    setShowEditOptions((prev) => !prev);
  };

  const handleDeletePost = async () => {
    try {
      // Make DELETE request with both user_id and post_id as route parameters
      await axios.delete(`http://localhost:5000/api/posts/${user_id}/${post_id}`);
      alert('Post deleted successfully!');
      // Optionally refresh the feed or remove the post from UI here
    } catch (error) {
      console.error('Error deleting post:', error.response?.data?.message || error.message);
      alert('Failed to delete the post. Please try again.');
    }
  };
  

  const handleUpdatePost = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${user_id}/${post_id}`, {
        caption: updatedCaption,
      });
      alert('Post updated successfully!');
      setShowEditOptions(false);
    } catch (error) {
      console.error('Error updating post:', error.response?.data?.message || error.message);
      alert('Failed to update the post. Please try again.');
    }
  };

  return (
    <div className="feed">
      <div className="head">
        <div className="user">
          <div className="profile-pic">
            <img onClick={() => navigate('/profile/' + user_id)} src={cloudinaryLink + profilePhoto} alt={username} />
          </div>
          <div className="info">
            <h3>{username}</h3>
            <small>{`${location}, ${timeAgo}`}</small>
          </div>
        </div>
        <span className="edit" onClick={handleEditClick}>
          <i><UilEllipsisH /></i>
        </span>
        {showEditOptions && (
          <div className="edit-options">
            <button onClick={handleDeletePost}>Delete</button>
            <button onClick={handleUpdatePost}>Update</button>
            {/* Update input field to modify caption */}
            <input
              type="text"
              value={updatedCaption}
              onChange={(e) => setUpdatedCaption(e.target.value)}
              placeholder="Edit caption..."
            />
          </div>
        )}
      </div>
      <div className="photo">
        <img src={cloudinaryLink + feedPhoto} alt="Feed" />
      </div>
      <div className="action-buttons">
        <div className="interaction-buttons">
          <span className='int'><i><UilHeart /></i></span>
          <span className='int'><i><UilCommentDots /></i></span>
          <span className='int'><i><UilShareAlt /></i></span>
        </div>
        <div className="bookmark">
          <span><i><UilBookmarkFull /></i></span>
        </div>
      </div>
      <div className="liked-by">
        {displayLikedBy ? (
          <>
            {likedBy.map((photo, index) => (
              <span key={index}>
               
                <img src={process.env.REACT_APP_CLOUDINARY_LINK + photo} />
              </span>
            ))}
            <p>
              Liked by <b>{likedName}</b> and <b>{likesCount - 1} others</b>
            </p>
          </>
        ) : mutualFollowers.length > 0 ? (
          <>
            {mutualFollowerImages.map((photo, index) => (
              <span key={index}>
                <img src={process.env.REACT_APP_CLOUDINARY_LINK + photo} alt={`Mutual follower ${index + 1}`} />
              </span>
            ))}
            <p>
              Followed by <b>{randomFollowerName}</b> and <b>{mutualFollowers.length - 1} others</b>
            </p>
          </>
        ) : (
          <p>
            Followed by <b>{randomFollowerName}</b>
          </p>
        )}
      </div>
      <div className="caption">
        <p>{caption}</p>
      </div>
      <div className="comments text-muted">
        View all {commentsCount} comments
      </div>
    </div>
  );
};

export default FeedTemplate;
