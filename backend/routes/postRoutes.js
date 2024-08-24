const express = require('express');
const router = express.Router();
const { getCurrentUser ,getFollowedUsersPosts,getBookmarkedPosts } = require('../controllers/postController');

// Route to get the current user by ID
router.get('/user/:id', getCurrentUser);
router.get('/fp/:id', getFollowedUsersPosts);
// router.get('/bookmarks/:id', getBookmarkedPosts);
module.exports = router;