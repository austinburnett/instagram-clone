const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

/**
 * users.js 
 * @desc Handles routes for user resources
 */

// Get ALL users
router.get('/', userController.getUsers);

// Get user by id
router.get("/:id", userController.getUser);

// Update user
router.patch("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
