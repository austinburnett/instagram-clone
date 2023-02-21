const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

/**
 * users.js 
 * @desc Handles routes for user resources
 */

// Get ALL users
router.get('/', userController.getUsers);

// Get user
router.get("/:userId", userController.getUser);

// Update user
router.put("/:userId", userController.updateUser);

// Delete user
router.delete("/:userId", userController.deleteUser);

module.exports = router;
