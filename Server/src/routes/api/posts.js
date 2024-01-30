const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
const comments = require("./comments.js");
const setPostId = require("../../middleware/setPostId.js");

/**
 * posts.js 
 * @desc Maps a route to a given post controller that 
 * handles the CRUD logic for the post resource.
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

// Like post
router.patch("/:id/like", postController.likePost);

// Comments
router.use("/:id/comments", setPostId, comments);

module.exports = router;
