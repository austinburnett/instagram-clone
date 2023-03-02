const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
const comments = require("./comments.js");
/**
 * posts.js 
 * @desc Handles routes for post resources
 */

// Get ALL posts 
router.get('/', postController.getAllPost);

// Get post by id
router.get("/:id", postController.getPost);

// Create new post
router.post("/", postController.createPost);

// Update post by id
router.patch("/:id", postController.updatePost);

// Delete post 
router.delete("/:id", postController.deletePost);

// Upvote post
router.patch("/:id/upvote", postController.upvote);

// Comments
router.use("/:id/comments", (req, res, next) => {
    console.log("from posts routes middleware", req.params);
    req.post_id = req.params.id
    next();
}, comments);

module.exports = router;
