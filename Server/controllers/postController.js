const formidable = require("formidable");
const post = require("../models/postModel");

/**
 * postController.js
 * @desc Export functions that handles req/res logic for posts 
 */ 

// Create Post
exports.createPost = (req, res) => {
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if(formErr) {
      console.err(formErr);
      return;
    }
    
    try {
      // try to create post here
      const newPost = new post({
        title: `${ fields.title }`,
        user_id: req.username,
        content: `${ fields.content }`,
        caption: `${ fields.caption }`,
      });

      await newPost.save();
      
    } catch(err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  // 201 status code created
  res.sendStatus(201);
}

// Get Post 
exports.getPost = (req, res) => {
  // We'll need the post id from the client
  // ie front end functionality will get us this?
}

// Read All Recent Post
exports.getAllPost = async(req, res) => {
  const posts = await post.find();
  res.json({posts});
}
// Update/replace Post
exports.postPost = (req, res) => {
}

// Update a part of the Post
exports.putPost = (req, res) => {
  // need a post id to edit here
}

// Delete Post
exports.deletePost = (req, res) => {
}
