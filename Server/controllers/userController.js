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
        res.status(401).send("User not found");
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
      }
      else {
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
  res.json({ users });
}

exports.getUser = async (req, res) => {
    try{
        const queryUser = await user.findById(req.params.id);
        res.json({ queryUser });
    }catch(error){
        console.error(error);
        res.sendStatus(404);
    }
}

exports.updateUser = (req, res) => {
  // Allow password to be changed
  // we'll have to hash it again
  // also we'll need email verification, username verification etc
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if(formErr) {
      console.err(formErr);
      return;
    }
    
    try {
      // Maybe check if document exists? Or verify post is actually updated
        user.findByIdAndUpdate(req.params.id, {
            email: `${ fields.email}`,
            username: `${ fields.username }`,
            //pass: `${ fields.password }`,
        }, (user) => {
            // Needs callback to execute query
            // this still gives null
            console.log(user);
        });

        res.status(201).send("User updated");
        console.log("User updated with id:" + " " + req.params.id);
      
    } catch(err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
}

exports.deleteUser = async (req, res) => {
    try{
        await user.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted");
    }catch(err){
        console.error(err);
        res.sendStatus(404);
    } finally{
        console.log("User deleted");
    }
}

