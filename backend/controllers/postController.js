const User = require('../models/User');
const mongoose = require('mongoose');
// Get current user data
const getCurrentUser = async (req, res) => {
  try {
    const currentUser = await User.findOne({ user_id: req.params.id });
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(currentUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
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
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 3: Get the list of user IDs that the current user is following
    const followingIds = currentUser.following; // Assuming `following` is an array of user IDs

    // Step 4: Fetch posts from followed users
    const posts = await User.find({ user_id: { $in: followingIds } }).sort({ createdAt: -1 }); // Assuming `createdAt` is a field to sort posts by newest first

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// Function to add a new post with a secure URL
const addNewPost = async (req, res) => {
  try {
    const { image_url, caption } = req.body;
    const currentUserId = req.params.id;
    const user = await User.findOne({ user_id: currentUserId });

    if (user) {
      // Get the last post's id and increment it by 1
      const lastPostId = user.posts.length > 0 ? user.posts[user.posts.length - 1].post_id : 0;
      const newPostId = lastPostId + 1;
console.log(newPostId);


      const newPost = {
        _id: new mongoose.Types.ObjectId().toString(),
        post_id: newPostId,
        image_url: image_url,
        caption: caption,
        posted_time: new Date(),
        likes: [],
        comments: [],
      };

      user.posts.push(newPost);
      user.post_count += 1;

      await user.save();

      res.status(201).json({ message: 'Post added successfully', post: newPost });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error });
  }
};



module.exports = { getCurrentUser , getFollowedUsersPosts ,addNewPost};
