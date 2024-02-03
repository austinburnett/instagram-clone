const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/commentController.js");

/**
 * comments.js 
 * @desc Handles logic for comment resource
 */

// Express middleware for parsing req body raw text
router.use(express.text());

router.get('/', commentController.getAllComments);

router.get("/:id", commentController.getComment);

router.post("/", commentController.createComment);

router.patch("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
