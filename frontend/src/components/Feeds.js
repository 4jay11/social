import React from 'react';
import { assets } from './images/assets';
import FeedTemplate from './FeedTemplate';
import { users } from '../jsonData/data'; // Assuming users is the array of feed data
import { formatDistanceToNow, parseISO } from 'date-fns';

const Feeds = () => {
  // Format timeAgo from posted_time
  const formatTimeAgo = (postedTime) => {
    return formatDistanceToNow(parseISO(postedTime), { addSuffix: true });
  };

  console.log(users[0].posts[0].posted_time);

  return (
    <div className="feeds">
      {users.map((feed, index) => (
        <FeedTemplate
          key={feed.user_id} // Use `feed.user_id` for the key
          profilePhoto={feed.profile_image || assets.profile7}
          username={feed.name}
          location={feed.location || "Unknown Location"}
          timeAgo={
            feed.posts[0]?.posted_time ? formatTimeAgo(feed.posts[0].posted_time) : "Just now"
          }
          feedPhoto={feed.posts[0]?.image_url || assets.feed1} // Use the first post's image as feedPhoto
          likedBy={feed.likedBy || [
            assets.profile6,
            assets.profile7,
            assets.profile8,
          ]}
          likesCount={feed.posts[0]?.likes.length || 0}
          caption={feed.posts[0]?.caption || "No caption"}
          commentsCount={feed.posts[0]?.comments.length || 0}
          index={index} // Pass the index as a prop
        />
      ))}
    </div>
  );
};

export default Feeds;
