const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  privacy: {
    profileVisibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    allowMessagesFrom: {
      type: String,
      enum: ["everyone", "followers"],
      default: "everyone",
    },
  },
});

module.exports = mongoose.model("Settings", SettingsSchema);
