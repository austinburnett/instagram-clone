const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

/**
 * user.js 
 * @desc Handles routes for users' resources
 */

// Login Page
router.get("/login", userController.login);

// Login form 
router.post("/login", userController.loginForm);

// Register Page
router.get("/register", userController.register);

// Register form 
router.post("/register", userController.registerForm);

// Get ALL users
router.get('/', userController.getUsers);

// Get user
router.get('/:userId', userController.getUser);

// Update user
router.get('/:userId', userController.updateUser);

// Delete user
router.get('/:userId', userController.deleteUser);

module.exports = router;
