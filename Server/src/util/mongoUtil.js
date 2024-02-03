const mongoose = require("mongoose");

/**
 * Connects to mongoDB database called instaCloneDB.
 * @returns {Promise} Returns promise with value of type Mongoose
 * @throws {MongooseError}
 */
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Connected to MongoDB.");
  }
};

/**
 * Enables db connection reusability.
 * @returns {Mongoose} Mongoose db instance
 */
const getDb = () => {
  return mongoose;
};

/**
 * @TODO: make sure to wait until all save calls have been processed to exit
 * Closes all MongoDB connections and exits with value 0.
 * @throws {MongooseError}
 */
const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

module.exports = { connect, getDb, disconnect };
