const mongoose = require("mongoose");

/*
 * commentSchema
 * @desc Defines comment schema for embedding in Post Model
 */

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        minLength: 1,
        required: true,
    }
});

module.exports = commentSchema;
