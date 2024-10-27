import React, { useEffect } from "react";
import { assets } from "./images/assets";
import axios from "axios";
import FeedTemplate from "./FeedTemplate";
import { formatDistanceToNow, parseISO } from "date-fns";

const Feeds = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [followingPosts, setfollowingPosts] = React.useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/user/1`);
        setCurrentUser(response.data);
        const res = await axios.get(`http://127.0.0.1:5000/api/fp/1`);
        setfollowingPosts(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);

  // Format timeAgo from posted_time
  const formatTimeAgo = (postedTime) =>
    formatDistanceToNow(parseISO(postedTime), { addSuffix: true });

  const me = currentUser || {};
  const followingUserIds = me.following || [];
  const myPosts = me.posts || [];
  
  // Filter followingPosts to include only users with posts greater than 0
  const followingPost = (followingPosts || []).filter(
    (user) => user.posts && user.posts.length > 0
  );
  const users = [...[me], ...followingPost];

  // Extract the posts from the followingPost array to a new array
  const followingP = followingPost?.map((post) => post?.posts?.[0]) || [];
  const allPosts = [...myPosts, ...followingP];

  return (
    <div className="feeds">
      {allPosts.length > 0 ? (
        allPosts.map((post, index) => {
          const user =
            users.find((user) =>
              user?.posts?.some((p) => p?.post_id === post?.post_id)
            ) || {};

          const location = user?.posts?.[index]?.location || "Unknown Location";
          const { profile_image = assets.profile7, name = "Unknown User", followers = [] } = user;

          const mutualFollowers = followers.filter((followerId) =>
            followingUserIds.includes(followerId)
          );

          const mutualFollowerImages = mutualFollowers.map(
            (followerId) =>
              users.find((user) => user?.user_id === followerId)?.profile_image
          );

          const randomFollowerName =
            mutualFollowers.length > 0
              ? users.find((user) => user?.user_id === mutualFollowers[0])?.name
              : "You";

              const likedBy = 
              Array.isArray(post?.likes) && Array.isArray(followingUserIds)
                ? post.likes.filter((like) => followingUserIds.includes(like))
                : [];
            

          const otherLikes = post?.likes?.filter(
            (id) => id !== currentUser?.user_id
          );

          // Ensure random selection within valid length
          const randomLikeId =
            otherLikes?.length > 0
              ? otherLikes[Math.floor(Math.random() * otherLikes.length)]
              : null;

          const likedName = randomLikeId
            ? users.find((user) => user?.user_id === randomLikeId)?.name
            : "You";

            
          return (
            <FeedTemplate
              key={post?.post_id || index}
              user_id={user?.user_id}
              post_id={post?.post_id}
              profilePhoto={profile_image}
              username={name}
              location={location}
              timeAgo={
                post?.posted_time
                  ? formatTimeAgo(post?.posted_time)
                  : "Just now"
              }
              feedPhoto={post?.image_url || assets.feed1}
              likedBy={
                likedBy || []
              }
              likedName={likedName}
              likesCount={post?.likes?.length || 0}
              mutualFollowers={mutualFollowers}
              randomFollowerName={randomFollowerName}
              mutualFollowerImages={mutualFollowerImages}
              caption={post?.caption || "No caption"}
              commentsCount={post?.comments?.length || 0}
              index={index}
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
