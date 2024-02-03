const express = require("express");
const router = express.Router();

const users = require("./api/users.js");
const posts = require("./api/posts.js");
const userController = require("../controllers/userController.js");
const isAuthenticated =
  require("../middleware/isAuthenticated.js").isAuthenticated;

// Login form
router.post("/login", userController.login);

// Create User, Register form
router.post("/register", userController.register);

// Mount authorization middleware before api
router.use(isAuthenticated);

// Api Router (API Entry Point)
router.use("/users", users);
router.use("/posts", posts);

module.exports = router;
