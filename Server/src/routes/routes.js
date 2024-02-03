const express = require("express");
const router = express.Router();
const users = require("./api/users");
const posts = require("./api/posts");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated").isAuthenticated;

// Login form 
router.post("/login", userController.loginForm);

// Create User, Register form 
router.post("/register", userController.registerForm);

// Mount authorization middleware before api
router.use(isAuthenticated);

// Api Router (API Entry Point)
router.use("/users", users); 
router.use("/posts", posts); 

module.exports = router;
