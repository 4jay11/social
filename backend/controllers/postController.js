const User = require("../models/User");
const mongoose = require("mongoose");
// Get current user data
const getCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ user_id: req.params.id });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(currentUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get posts from users that the current user is following
const getFollowedUsersPosts = async (req, res) => {
  try {
    // Step 1: Get the current user's ID from the request
    const currentUserId = req.params.id;

    // Step 2: Find the current user
    const currentUser = await User.findOne({ user_id: currentUserId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 3: Get the list of user IDs that the current user is following
    const followingIds = currentUser.following; // Assuming `following` is an array of user IDs

    // Step 4: Fetch posts from followed users
    const posts = await User.find({ user_id: { $in: followingIds } }).sort({
      createdAt: -1,
    }); // Assuming `createdAt` is a field to sort posts by newest first

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
// Function to add a new post with a secure URL
const addNewPost = async (req, res) => {
  try {
    const { user_id, image_url, caption ,location } = req.body;

    // Check if image_url and caption are provided
    if (!image_url || !caption) {
      return res
        .status(400)
        .json({ message: "Image URL and caption are required." });
    }

    const user = await User.findOne({ user_id });

    if (user) {
      // Find the maximum post ID in the user's posts
      const maxPostId = user.posts.reduce((max, post) => {
        return Math.max(max, parseInt(post.post_id, 10));
      }, 0);

      // Generate a new post ID by incrementing the maximum post ID
      const newPostId = (maxPostId + 1).toString();
      const newPost = {
        _id: new mongoose.Types.ObjectId().toString(),
        post_id: newPostId,
        image_url, // Since `image_url` is already required, no need for fallback value
        caption, // Since `caption` is already required, no need for fallback value
        posted_time: new Date(),
        location, // Added new field for location
        likes: [],
        comments: [],
      };

      // Append the new post to the user's posts array
      user.posts.push(newPost);

      // Increment the post count
      user.post_count += 1;

      // Save the user document with the new post
      await user.save();

      // Send a success response
      res
        .status(201)
        .json({ message: "Post added successfully", post: newPost });
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getCurrentUser, getFollowedUsersPosts, addNewPost };
