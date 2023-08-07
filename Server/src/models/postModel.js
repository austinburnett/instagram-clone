const mongoose = require("mongoose");
const commentSchema = require("./commentModel.js");

/*
 * postSchema
 * @desc Contains a reference to the posts collection in db
 * @export Class that allows us to interface with our posts
 */

  const postSchema = new mongoose.Schema({
    created_at: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      minLength: 1,
      required: true
    },
    likes: [{
        username: String
    }],
    comments: [{
        type: mongoose.ObjectId,
        ref: "commentSchema",
    }]
  });

/* NOTE: methods must be added to the schema before compiling it with mongoose.model()
 * Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly 
 * prevent binding this, so your method will not have access to the document.
 */
  const posts = mongoose.model("posts", postSchema);
  module.exports = posts;
