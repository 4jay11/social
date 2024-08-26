import React, { useState, useEffect } from 'react';
import { UilEllipsisH, UilBookmarkFull, UilHeart, UilCommentDots, UilShareAlt } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';

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
  mutualFollowerImages
}) => {
  const [displayLikedBy, setDisplayLikedBy] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setDisplayLikedBy(likedBy.length > 0);
  }, [likedBy]);
  const cloudinaryLink = process.env.REACT_APP_CLOUDINARY_LINK;
  return (
    <div className="feed">
      <div className="head">
        <div className="user">
          <div className="profile-pic">
            <img onClick={() => navigate('/profile/'+user_id)} src={cloudinaryLink+profilePhoto} alt={username} />
            {/* {console.log(process.env.REACT_APP_CLOUDINARY_LINK+profilePhoto)} */}
          </div>
          <div className="info">
            <h3>{username}</h3>
            <small>{`${location}, ${timeAgo}`}</small>
          </div>
        </div>
        <span className="edit">
          <i><UilEllipsisH /></i>
        </span>
      </div>
      <div className="photo">
        <img src={cloudinaryLink+feedPhoto} alt="Feed" />
       {console.log(cloudinaryLink+feedPhoto)}
       
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
                <img src={cloudinaryLink+photo} alt={`Liked by ${index + 1}`} />
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
                <img src={cloudinaryLink+photo} alt={`Mutual follower ${index + 1}`} />
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
