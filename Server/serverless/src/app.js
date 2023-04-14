const express = require("express");
const routes = require("./routes/routes");
const serverless = require("serverless-http");
const app = express();

// Initial route
app.use("/expressApp", routes);

module.exports.handler = serverless(app);
