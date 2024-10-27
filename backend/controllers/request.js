
const User = require('../models/User'); // assuming you have a User model defined using Mongoose

// Accept friend request
updateRequestAdd =async (req, res) => {
  try {
    const { currentUserId } = req.params;
    const { requestId } = req.body;

    // Find the current user
    const currentUser = await User.findOne({ user_id: currentUserId });
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove the requestId from followRequest and add to followers
    currentUser.followRequest = currentUser.followRequest.filter(id => id !== requestId);
    currentUser.followers.push(requestId);

    // Save the updated user
    await currentUser.save();

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Decline friend request
updateRequestDelete = async (req, res) => {
  try {
    const { currentUserId } = req.params;
    const { requestId } = req.body;

    // Find the current user
    const currentUser = await User.findOne({ user_id: currentUserId });
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the requestId from followRequest without adding to followers
    currentUser.followRequest = currentUser.followRequest.filter(id => id !== requestId);

    // Save the updated user
    await currentUser.save();

    res.status(200).json({ message: 'Friend request declined' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateRequestAdd, updateRequestDelete };
