const mongoose = require("mongoose");

/*
 * commentSchema
 * @desc Contains comment data for embedding in Post Model
 */
const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        required: true
    },
    text: {
        type: String,
        minLength: 1,
        required: true,
    }
});

/*
 * postSchema
 * @desc Contains a reference to the posts collection in db
 * @export Class that allows us to interface with our posts
 */

  // probably shouldnt hardcode this, use ENV variable
  const contentPath = "https://wallhaven.cc";
  const postSchema = new mongoose.Schema({
    title: {
      type: String,
      maxlength: 50,
      required: true
    },
    // mongdb DBref
    user_id: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
      required: true,
      // Remember this is not stored in mongodb
        // i should just delete this
      get: (c) => `${ contentPath }${ c }`
    },
    caption: {
      type: String,
      minLength: 1,
      required: true
    },
    comments: {
      type: Array,
      of: commentSchema
    },
    meta: {
      date: {
        type: Date,
        default: Date.now()
      },
      upvotes: {
        type: Number,
        default: 0,
        user_id: mongoose.ObjectId,
        ref: "users"
      }
    },
  });

/* NOTE: methods must be added to the schema before compiling it with mongoose.model()
 * Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly 
 * prevent binding this, so your method will not have access to the document.
 */
  const posts = mongoose.model("posts", postSchema);
  module.exports = posts;
