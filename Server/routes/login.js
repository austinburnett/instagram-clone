const express = require("express");
const router = express.Router();

// Login Page Route
router.get("/", (req, res) => {
    res.send("This is the login page");
});

// https://stackoverflow.com/questions/40294870/module-exports-vs-export-default-in-node-js-and-es6
// https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router;