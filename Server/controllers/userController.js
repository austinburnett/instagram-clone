const formidable = require("formidable");
const user = require("../models/userModel");
/**
 * loginController.js
 * @desc Handles login requests
 * @export user middleware
 */ 

/** 
 * loginForm
 * TODO: 
 */
exports.loginForm = (req, res, next) => {    
  const form = formidable();
  form.parse(req, async (err, fields) => {
    if(err) {
      console.err(err);
      return;
    }
    try {
      // Query users 
      const currUser = await user.findOne({email:`${ fields.email }`});

      // User doesn't exist
      if(!currUser) { res.send("user not found"); }

      else if(await user.authenticate(currUser.password, fields.pass)) {
        // user is authenticated
        res.send("authenticated");
      }
      else {
        // user not authenticated
        res.send("not authenticated");
      } 
    } catch(err) {
      console.error(err);
    }
  });
}

exports.login = (req, res) => {
  res.render("../views/login.pug");
}

/**
 * registerForm
 * TODO: 
 * send error if email in use
 * @improvement Improve the password validation so that 
 * you don't have to click off of the input for the button 
 * to be enabled
 */
exports.registerForm = (req, res, next) => {    
  const form = formidable();
  form.parse(req, async (err, fields) => {
    if(err) {
      console.err(err);
      return;
    }

    // Verify email is not in use
    const emailInUse = await user.findOne({email: `${ fields.email }`});
    if(emailInUse) {
      res.send(`User found with the same email address: ${ emailInUse.email }`);
    }
    else {
      // Hash password 
      const hash = await user.argon2id(`${ fields.pass }`);

      // Store new user in db 
      const newUser = new user({ email:`${ fields.email }`, password:`${ hash }`});
      newUser.save();
      res.send("Stored in db");
    }  
  });
}

exports.register = (req, res) => {
  res.render("../views/register.pug");
}


exports.getUsers = async (req, res) => {
  const users = await user.find();
  res.json({users});
}

exports.getUser = (req, res) => {
  res.send("getUser needs to be completed");
}

exports.updateUser = (req, res) => {
  res.send("updateUser needs to be completed");
}

exports.deleteUser = (req, res) => {
  res.send("deleteUser needs to be completed");
}

