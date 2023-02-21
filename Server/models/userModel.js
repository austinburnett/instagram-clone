const mongoose = require("mongoose");
const post = require("./postModel");
const argon2 = require("argon2");

/*
 * Todo:
 * Define method for user to be able to post a post and comment
 * We could create a instance function for each document to
 * create a comment and post
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

/**
 * argon2id
 * @desc Applies a hash function to user's password.
 * @param { pass } user's password
 * @ret { String } Encoded-hash value + salt
 */
userSchema.statics.argon2id = async function(pass) {
  let hash;
  try {
    hash = await argon2.hash(pass);
  }catch(err) {
    console.error(err);
  }
  return hash;
}

/**
 * authenticate 
 * @desc Verify the hash matches the password entered 
 * @param { pass } user's password
 * @param { hash } return value of argon2id
 * @ret { Boolean }
 */ 
userSchema.statics.authenticate = async function(hash, pass) {
  try {
    if(await argon2.verify(hash, pass)) {
      // passwords match
      return true;
    }
    else {
      // passwords don't match
      return false;
    }
  } catch(err) {
    console.error(err);
  } 
}

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document 

// Compile Schema && Export model
const user = mongoose.model("users", userSchema); 
module.exports = user; 
