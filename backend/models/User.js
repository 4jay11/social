const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user_id: String,
    username: String,
    comment: String,
    commented_time: Date,
});

const postSchema = new mongoose.Schema({
    post_id: String,
    image_url: String,
    caption: String,
    posted_time: Date,
    likes: [String],
    comments: [commentSchema],
});

const storySchema = new mongoose.Schema({
    story_id: String,
    image_url: String,
    posted_time: Date,
    viewed: Boolean,
});

const savedPostSchema = new mongoose.Schema({
    id: String,
    bookmarkPhoto: [String],
});

const userSchema = new mongoose.Schema({
    user_id: String,
    username: String,
    name: String,
    profile_image: String,
    location: String,
    followers_count: Number,
    following_count: Number,
    post_count: Number,
    description: String,
    is_following: Boolean,
    profile_visibility: String,
    posts_visibility: String,
    followers_visibility: String,
    following_visibility: String,
    posts: [postSchema],
    following: [String],
    followers: [String],
    followRequest: [String],
    stories: [storySchema],
    savedPosts: [savedPostSchema],
});

// Create the model and connect to the specific collection
const User = mongoose.model('User', userSchema, process.env.COLLECTION_NAME);

module.exports = User;
