const express = require("express");
const router = express.Router();
const usersRoutes = require("./api/user");

/**
 * Home Page Routing
 * TODO: if not logged in
 * res.redirect() to redirect user until logged in
 * once logged in, pass to other routes to handle
 */

router.get("/", (req, res) => {
    res.send("This is the home page.");
});

// Mount users Routes Middleware
router.use("/api/users", usersRoutes);

module.exports = router;
