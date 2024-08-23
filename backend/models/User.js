const mongoose = require('mongoose');

// Define the schema for the posts
const postSchema = new mongoose.Schema({
  post_id: String,
  image_url: String,
  caption: String,
  posted_time: Date,
  likes: [String],
  comments: [
    {
      user_id: String,
      comment: String,
      posted_time: Date,
    },
  ],
});

// Define the schema for the user
const userSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  profile_image: String,
  location: String,
  following: [String],
  posts: [postSchema],
});

// Create the model and connect to the specific collection
const User = mongoose.model('User', userSchema, process.env.COLLECTION_NAME);

module.exports = User;
