const express = require("express");
const router = express.Router();

const users = require("./api/users.js");
const posts = require("./api/posts.js");
const userController = require("../controllers/userController.js");
const isAuthenticated =
  require("../middleware/isAuthenticated.js").isAuthenticated;

router.post("/login", userController.login);

router.post("/register", userController.register);

router.use(isAuthenticated);

// REST Api
router.use("/users", users);
router.use("/posts", posts);

module.exports = router;
