import React from 'react';
import { assets } from './images/assets';
import FeedTemplate from './FeedTemplate';
import { users } from '../jsonData/data'; // Assuming users is the array of feed data
import { formatDistanceToNow, parseISO } from 'date-fns';

const Feeds = () => {
  // Format timeAgo from posted_time
  const formatTimeAgo = postedTime =>
    formatDistanceToNow(parseISO(postedTime), { addSuffix: true });

  // Get the user at the first index (considered as 'me')
  const me = users[0] || {};

  // Get the user IDs of the people 'me' is following
  const followingUserIds = me.following || [];

  // Filter the posts of the user at the first index (me)
  const myPosts = me.posts || [];

  // Filter posts of users that 'me' is following
  const followingPosts = users
    .filter(user => followingUserIds.includes(user?.user_id))
    .flatMap(user => user?.posts || []);

  // Combine both myPosts and followingPosts
  const allPosts = [...myPosts, ...followingPosts];
  console.log(allPosts);

  return (
    <div className="feeds">
      {allPosts.length > 0 ? (
        allPosts.map((post, index) => {
          const user = users.find(user =>
            user?.posts?.some(p => p?.post_id === post?.post_id)
          ) || {};

          const { profile_image, name, location } = user;

          return (
            <FeedTemplate
              key={post?.post_id || index} // Use post_id or index as the key
              profilePhoto={profile_image || assets.profile7}
              username={name || 'Unknown User'}
              location={location || 'Unknown Location'}
              timeAgo={post?.posted_time ? formatTimeAgo(post?.posted_time) : "Just now"}
              feedPhoto={post?.image_url || assets.feed1}
              likedBy={post?.likedBy || [
                assets.profile6,
                assets.profile7,
                assets.profile8,
              ]}
              likesCount={post?.likes?.length || 0}
              caption={post?.caption || "No caption"}
              commentsCount={post?.comments?.length || 0}
              index={index} // Pass the index as a prop
            />
          );
        })
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Feeds;
