
import React from 'react';
import {users} from '../jsonData/data';
import { UilBookmarkFull ,UilHeart, UilCommentDots, UilShareAlt } from '@iconscout/react-unicons';
const FeedTemplate = ({
  profilePhoto,
  username,
  location,
  timeAgo,
  feedPhoto,
  likedBy,
  likesCount,
  caption,
  commentsCount,
  likedName
}) => {

 

  
  return (
    <div className="feed">
      <div className="head">
        <div className="user">
          <div className="profile-photo">
            <img src={profilePhoto} alt={username} />
          </div>
          <div className="info">
            <h3>{username}</h3>
            <small>{`${location}, ${timeAgo}`}</small>
          </div>
        </div>
        <span className="edit">
          <i>:</i>
        </span>
      </div>
      <div className="photo">
        <img src={feedPhoto} alt="Feed" />
      </div>
      <div className="action-buttons">
        <div className="interaction-buttons">
          <span className='int'><i ><UilHeart /></i></span>
          <span className='int'><i ><UilCommentDots/></i></span>
          <span className='int'><i >< UilShareAlt /></i></span>
        </div>
        <div className="bookmark">
          <span><i><UilBookmarkFull /></i></span>
        </div>
      </div>
      <div className="liked-by">
        {likedBy.map((photo, index) => (
          <span key={index}>
            <img src={photo} alt={`Liked by ${index + 1}`} />
          </span>
        ))}
        <p>
          Liked by <b>{likedName}</b> and <b>{likesCount-1} others</b>
        </p>
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
