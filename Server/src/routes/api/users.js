const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

/**
 * users.js
 * @desc Handles logic for user resource
 */

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
