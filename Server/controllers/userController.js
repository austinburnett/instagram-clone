const formidable = require("formidable");
const user = require("../models/userModel");
let jwt = require("jsonwebtoken");
//const randomBytes = require("node:crypto").randomBytes;

/**
 * userController.js
 * @desc Export functions that handles req/res logic for users
 */ 

/** 
 * loginForm
 * @desc Handles login for a user 
 * @returns { Token } JWT on success   
 */
exports.loginForm = (req, res, next) => {    
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if(formErr) {
      console.err(formErr);
      return;
    }
    
    try {
      const userFound = await user.findOne({email:`${ fields.email }`});

      if(!userFound) { 
        res.sendStatus(401);
      }

      else if(await user.authenticate(userFound.password, fields.pass)) {
        
        const token = jwt.sign({
          audience: `${ userFound._id }`,
          issuer: "InstaClone",
        }, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "1 hour",
        });
        res.json( { token } );
        //res.json( { userFound } );
      }
      else {
        // TODO: Redirect to home page which will prompt login if token is not sent 
        res.sendStatus(401);
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
 * @desc Handles creating a new user. 
 */
exports.registerForm = (req, res, next) => {    
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if(formErr) {
      console.err(formErr);
      return;
    }

    const emailInUse = await user.findOne({email: `${ fields.email }`});
    
    if(emailInUse) {
      res.send(`User found with the same email address: ${ emailInUse.email }`);
    }
    else {
      const hash = await user.argon2id(`${ fields.pass }`);
      const newUser = new user({ email:`${ fields.email }`, username: `${ fields.username }`, password:`${ hash }`});
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

