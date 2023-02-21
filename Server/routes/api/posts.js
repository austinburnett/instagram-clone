const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");

/**
 * posts.js 
 * @desc Handles routes for post resources
 */

// Get ALL posts 
router.get('/', postController.getAllPost);

// Create post
router.post("/new", postController.createPost);

// Get post 
router.get("/:postId", postController.getPost);

// Update post 
router.put("/:postId", postController.putPost);

// Delete post 
router.delete("/:postId", postController.deletePost);

module.exports = router;
