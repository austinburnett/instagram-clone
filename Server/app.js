const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const mongoUtil = require("./util/mongoUtil");
const app = express();

// Setup .env
dotenv.config();

// Listen on specified port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

// Template Engine Setup
app.set("views", "./views");

// Initial route
app.use("", routes);

// Connect to db
mongoUtil.connect(() => {
    /** Testing to ensure db connection works. Make sure to delete callback as argument.
    db = mongoUtil.getDb();
    console.log("In app.js: ", db instanceof mongoose.Mongoose);
    console.log(db.connection.readyState);

    const catSchema = new db.Schema({name: String});
    const Cat = db.model("Cat", catSchema);
    const bob = new Cat({name: "bob"});
    bob.save(function (err) {
        if (err) return handleError(err);
      });
     */
});

// Close all connections when the application recieves SIGINT signal
process.on("SIGINT", async() => {
    db = mongoUtil.getDb();
    await db.disconnect();
    console.log("\nMongoDB connections closed.");
    process.exit(0);
});
