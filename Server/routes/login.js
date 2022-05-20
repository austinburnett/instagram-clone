const express = require("express");
const router = express.Router();

// Login Page Route
router.get("/", (req, res) => {
    res.render("../views/login.pug", {title: "Austin", message: "This is the login page!"});
    //res.send("This is the login page");
});

module.exports = router;