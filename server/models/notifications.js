const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    }, // Receiver of the notification
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    }, // Who triggered the notification
    type: {
        type: String,
        enum: ["like", "comment", "follow"],
        required: true
    },
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post",
        required: function() { return this.type !== "follow"; } // postId required only for like & comment
    },
    seen: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now, expires: '30d'
    } // Auto-delete after 30 days
});

module.exports = mongoose.model("Notification", NotificationSchema);