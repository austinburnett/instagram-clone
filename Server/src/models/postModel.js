const mongoose = require("mongoose");
const commentSchema = require("./commentModel.js");

/*
 * postSchema
 * @desc Contains a reference to the posts collection in db
 * @export Class that allows us to interface with our posts
 */

  // probably shouldnt hardcode this, use ENV variable
  const contentPath = "https://wallhaven.cc";
  const postSchema = new mongoose.Schema({
    created_at: {
      type: Date,
      default: Date.now(),
    },
    user_id: {
      type: mongoose.ObjectId,
      ref: "users",
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
    // do we really need this? read below
    comments: {
      type: Array,
      of: "commentSchema"
    },
    // would it be better to create a seperate schema for comments
      // when you could just store a null comment in the likes Array
      // for the Comment schema we would need to store extra fields for
      // user_id and post_id. However, if we implement it in likes we just
      // need 1 extra field that will default to null
    likes: [
        {
            type: mongoose.ObjectID,
            ref: "users",
            comment: String,
            default: NUll,
        }
    ],
  });

/* NOTE: methods must be added to the schema before compiling it with mongoose.model()
 * Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly 
 * prevent binding this, so your method will not have access to the document.
 */
  const posts = mongoose.model("posts", postSchema);
  module.exports = posts;
