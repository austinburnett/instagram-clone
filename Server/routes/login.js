const express = require("express");
const router = express.Router();

// Login Page Route
router.get("/", (req, res) => {
    res.render("../views/index.pug", {title: "Austin", message: "Its me!"});
    //res.send("This is the login page");
});

module.exports = router;