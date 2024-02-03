const formidable = require("formidable");
let jwt = require("jsonwebtoken");

const user = require("../models/User.js");
//const randomBytes = require("node:crypto").randomBytes;

/**
 * userController.js
 * @desc Export functions that handles req/res logic for users
 * @TODO:
 * Secret for signing jwt
 */

exports.login = (req, res, next) => {
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if (formErr) {
      console.err(formErr);
      return;
    }

    try {
      const userFound = await user.findOne({ email: `${fields.email}` });

      if (!userFound) {
        res.status(401).json("User not found");
      } else if (await user.authenticate(userFound.password, fields.pass)) {
        const token = jwt.sign(
          {
            audience: `${userFound._id}`,
            username: `${userFound.username}`,
            issuer: "Instagram Clone",
          },
          process.env.SECRET,
          {
            algorithm: "HS256",
            expiresIn: "1 hour",
          },
        );
        res.status(200).json({ token });
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      console.error(err);
    }
  });
};

exports.register = (req, res, next) => {
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if (formErr) {
      console.err(formErr);
      return;
    }

    const emailInUse = await user.findOne({ email: `${fields.email}` });

    if (emailInUse) {
      res.json(`User found with the same email address: ${emailInUse.email}`);
    } else {
      const hash = await user.argon2id(`${fields.pass}`);
      const newUser = new user({
        email: `${fields.email}`,
        username: `${fields.username}`,
        password: `${hash}`,
      });
      newUser.save();
      res.status(201).json("New User stored in db");
    }
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await user.find();
  res.status(200).json({ users });
};

exports.getUser = async (req, res) => {
  try {
    const queryUser = await user.findById(req.params.id);
    if (queryUser == null) {
      throw new Error("Check user id ", req.params.id);
    }
    res.status(200).json({ queryUser });
  } catch (error) {
    console.error(error);
    res.status(404).json("Error with getting user");
  }
};

/**
 * updateUser
 * @desc Updates all user data except password
 * @TODO:
 * Enable updates to password
 * Verify post found is not null
 */
exports.updateUser = (req, res) => {
  const form = formidable();
  form.parse(req, async (formErr, fields) => {
    if (formErr) {
      console.err(formErr);
      return;
    }

    try {
      user.findByIdAndUpdate(
        req.params.id,
        {
          email: `${fields.email}`,
          username: `${fields.username}`,
          //pass: `${ fields.password }`,
        },
        (err, user) => {
          if (err) {
            console.error(err);
          }
          // this still gives null
          console.log(user);
        },
      );

      res.status(201).json("User updated");
      console.log("User updated with id:" + " " + req.params.id);
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  });
};

/**
 * deleteUser
 * @desc Delete all user data
 * @TODO: Delete all post and comment data made by user
 */
exports.deleteUser = async (req, res) => {
  try {
    const userFound = await user.findByIdAndDelete(req.params.id);
    if (userFound == null) {
      throw new Error("Check user id ", req.params.id);
    }
    res.status(200).json("User deleted");
  } catch (err) {
    console.error(err);
    res.status(404).json("Error deleteing user");
  }
};
