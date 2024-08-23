const User = require('../models/User');

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

module.exports = { getCurrentUser , getFollowedUsersPosts };
