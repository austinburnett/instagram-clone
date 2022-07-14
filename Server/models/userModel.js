const mongoose = require("mongoose");
const post = require("./postModel");
const argon2 = require("argon2");

/**
 * What does our user need
 * id is included by default mongoose
 * email/username
 * authenticate: ability to hash password & check credentials
 * hashed password + salt?
 * ability to create a post
 * ability to delete a post
 * ability to update a post
 * update password
 * posts associated with userId
 * ability to like a post
 * ability to comment on a post
 * add friend
 * remove friend
 * view all friends
 */

// TODO: add validators for each property/field
const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: String,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
// Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document 

/**
 * argon2id
 * @desc Applies a hash function to user's password.
 * @ret { String } Encoded-hash value
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

/**
 * sliceEncodedHash 
 * @desc Breaks down encoded-hash for storage in database
 * @params encodedHash The return value from user.argon2id();
 * across multiple fields.
 * @ret 
 */ 
userSchema.statics.sliceEncodedHash = async function(encodedHash) {

}

// Compile Schema && Export model
const user = mongoose.model("users", userSchema); 
module.exports = user; 
