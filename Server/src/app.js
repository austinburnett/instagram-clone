const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const mongoUtil = require("./util/mongoUtil");
const app = express();

// Setup .env
dotenv.config();

// Listen on specified port
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${ process.env.PORT }`);
});

// Template Engine Setup
app.set("views", "./views");

// Initial route
app.use("/", routes);

// Connect to db
mongoUtil.connect(() => {});

// Close all connections when the application recieves SIGINT signal
process.on("SIGINT", async() => {
    db = mongoUtil.getDb();
    try{
        await db.disconnect();
    } catch(err){
        console.error(err);
    } finally{
        console.log("\nMongoDB connections closed.");
        process.exit();
    }
});
