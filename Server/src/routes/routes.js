const express = require("express");
const router = express.Router();
const users = require("./api/users");
const posts = require("./api/posts");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated").isAuthenticated;

// Home Page Route
router.get("/", (req, res) => {
  res.send("This is the home page.");
});

// Login Page
//router.get("/login", userController.login);

// Login Page w/form 
router.post("/login", userController.loginForm);

// Register Page
//router.get("/register", userController.register);

// Create User, Register form 
router.post("/register", userController.registerForm);

// Mount authorization middleware before api
// remember middleware goes in order!!
router.use(isAuthenticated);

// Api Router (API Entry Point)
//router.use("/users", isAuthenticated, users); 
router.use("/users", users); 
router.use("/posts", posts); 

module.exports = router;