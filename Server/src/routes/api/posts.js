const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
const comments = require("./comments.js");
const setPostId = require("../../middleware/setPostId.js");

/**
 * posts.js
 * @desc Handles logic for post resource
 */

router.get("/", postController.getAllPost);

router.get("/:id", postController.getPost);

router.post("/", postController.createPost);

router.patch("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

router.patch("/:id/like", postController.likePost);

// Comments route
router.use("/:id/comments", setPostId, comments);

module.exports = router;
