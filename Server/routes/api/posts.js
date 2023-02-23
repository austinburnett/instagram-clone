const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");

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
router.patch("/:id", postController.patchPost);

// Delete post 
router.delete("/:id", postController.deletePost);

module.exports = router;
