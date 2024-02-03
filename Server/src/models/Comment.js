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
    },
    post_id: {
        type: mongoose.ObjectId,
        ref: "posts"
    }
});

/* NOTE: methods must be added to the schema before compiling it with mongoose.model()
 * Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly 
 * prevent binding this, so your method will not have access to the document.
 */
const comments = mongoose.model("comments", commentSchema);
module.exports = comments;
