const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const mongoUtil = require("./util/mongoUtil");
const cors = require("cors");
const app = express();

// Setup .env
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${ process.env.PORT }`);
});

app.use(cors());

app.use("/", routes);

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
