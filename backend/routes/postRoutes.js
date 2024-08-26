const express = require('express');
const router = express.Router();
const { getCurrentUser ,getFollowedUsersPosts,getBookmarkedPosts,addNewPost } = require('../controllers/postController');

// Route to get the current user by ID
router.get('/user/:id', getCurrentUser);
router.get('/fp/:id', getFollowedUsersPosts);
router.post('/users/post', addNewPost);
module.exports = router;
