const mongoose = require("mongoose");

/*
 * commentSchema
 * @desc Defines comment schema for embedding in Post Model
 */

// do I really need this file?
    // read postModel.js
const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    text: {
        type: String,
        minLength: 1,
        required: true,
    }
});

module.exports = commentSchema;
