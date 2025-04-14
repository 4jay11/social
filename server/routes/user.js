const userRouter = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Bookmark = require("../models/bookmarks");
const Stories = require("../models/Stories");
const userAuth = require("../middlewares/userAuth");
const mongoose = require("mongoose");

userRouter.get("/bookmark", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;

    // Fetch bookmarks sorted by createdAt (most recent first)
    const bookmarks = await Bookmark.find({ userId: _id }).sort({
      createdAt: -1,
    });

    if (!bookmarks.length)
      return res.status(404).send("No Bookmarks Available");

    // Extract post IDs from bookmarks
    const postIds = bookmarks.map((bookmark) => bookmark.postId);

    // Fetch posts using the extracted post IDs
    const posts = await Post.find({ _id: { $in: postIds } });

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

userRouter.get("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid user ID." });

    const userProfile = await User.findById(id);
    if (!userProfile)
      return res.status(404).json({ message: "User not found." });

    const userPosts = await Post.find({ userId: id }).populate(
      "likes",
      "username profilePicture"
    );

    const stories = await Stories.find({ userId: id }).populate(
      "userId",
      "username profilePicture"
    );

    res
      .status(200)
      .json({ user: userProfile, posts: userPosts, stories: stories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

userRouter.patch("/update/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, profilePicture, username } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid user ID." });

    const user = await User.findById(id);
    if (!user) return res.send("User not found");
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { bio, profilePicture, username },
      { new: true }
    );

    if (!updatedUser) return res.send("User not updated");

    // Convert to plain object before adding custom field
    res.send({ user: updatedUser });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = userRouter;
