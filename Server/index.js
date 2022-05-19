const express = require("express");
const routes = require("./routes/routes");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Template Engine Setup
app.set("views", "./views");

// Initial route
app.use("/", routes);
