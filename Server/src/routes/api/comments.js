const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/commentController.js");

// Express middleware for parsing req body raw text
router.use(express.text());

// Get ALL posts 
router.get('/', commentController.getAllComments);

// Get comment by id
router.get("/:id", commentController.getComment);

// Create new comment
router.post("/", commentController.createComment);

// Update comment by id
router.patch("/:id", commentController.updateComment);

// Delete comment 
router.delete("/:id", commentController.deleteComment);

module.exports = router;
