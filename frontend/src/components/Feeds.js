import React, { useEffect } from "react";
import { assets } from "./images/assets";
import axios from "axios";
import FeedTemplate from "./FeedTemplate";
// import { users } from '../jsonData/data'; // Assuming users is the array of feed data
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

  // Get the user at the first index (considered as 'me')
  const me = currentUser || {};
  // console.log([me]);

  // Get the user IDs of the people 'me' is following
  const followingUserIds = me.following || [];

  // Filter the posts of the user at the first index (me)
  const myPosts = me.posts || [];

  // Filter posts of users that 'me' is following
  const followingPost = followingPosts || [];
  

  // currentUser and Following User
  const users = [...[me], ...followingPost];
  // console.log(users);

  // Extract the posts from the followingPost array to new array
  const followingP = followingPost?.map((post) => post?.posts?.[0]) || [];
  // console.log(followingP);

  // Combine both myPosts and followingPosts
  const allPosts = [...myPosts, ...followingP];

  return (
    <div className="feeds">
      {allPosts.length > 0 ? (
        allPosts.map((post, index) => {
          const user =
            users.find((user) =>
              user?.posts?.some((p) => p?.post_id === post?.post_id)
            ) || {};

          const { profile_image, name, location } = user;
          // Display the like persons only in the following list of the current user and for
          const likedBy =
            post?.likes
              ?.filter((like) => followingUserIds.includes(like))
              ?.map(
                (like) =>
                  users.find((user) => user?.user_id === like)?.profile_image
              ) || [];
         
          // Filter out the current user's like from the post likes array
          const otherLikes = post?.likes?.filter(
            (id) => id !== currentUser.user_id
          );

          // If there are other likes, pick a random one
          const randomLikeId =
            otherLikes?.length > 0
              ? otherLikes[Math.floor(Math.random() * otherLikes.length-1)]
              : null;

          // Find the username associated with the randomly selected like
          const likedName = randomLikeId
            ? users.find((user) => user?.user_id === randomLikeId)?.name
            : "You";
console.log(likedName);
          return (
            <FeedTemplate
              key={post?.post_id || index} // Use post_id or index as the key
              profilePhoto={profile_image || assets.profile7}
              username={name || "Unknown User"}
              location={location || "Unknown Location"}
              timeAgo={
                post?.posted_time
                  ? formatTimeAgo(post?.posted_time)
                  : "Just now"
              }
              feedPhoto={post?.image_url || assets.feed1}
              likedBy={
                likedBy || [assets.profile6, assets.profile7, assets.profile8]
              }
              likedName={likedName}
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
