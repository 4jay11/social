const express = require('express');
const router = express.Router();
const { getCurrentUser ,getFollowedUsersPosts } = require('../controllers/postController');

// Route to get the current user by ID
router.get('/user/:id', getCurrentUser);
router.get('/fp/:id', getFollowedUsersPosts);
module.exports = router;
