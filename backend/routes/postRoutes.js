const express = require('express');
const router = express.Router();
const { getCurrentUser ,getFollowedUsersPosts,deletePostById, updatePostById ,addNewPost } = require('../controllers/postController');

// Route to get the current user by ID
router.get('/user/:id', getCurrentUser);
router.get('/fp/:id', getFollowedUsersPosts);
router.post('/users/post', addNewPost);

// Route to delete a post by user_id and post_id
router.delete('/posts/:user_id/:post_id', deletePostById);

// Route to update a post by user_id and post_id
router.put('/posts/:user_id/:post_id', updatePostById);

module.exports = router;
