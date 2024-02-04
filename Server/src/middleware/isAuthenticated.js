let jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  let bearerToken = req.headers["authorization"];

  if (typeof bearerToken == "undefined") {
    res.status(401).json("Token is undefined");
  } else if (bearerToken.split(" ")[0] == "Bearer") {
    let token = bearerToken.split(" ")[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json("Token not verified");
        throw err;
      } else {
        req.userId = decoded.audience;
        req.username = decoded.username;
        console.log("user_id from auth middleware in routes: " + req.userId);
        console.log("username from auth middleware in routes: " + req.username);
      }
      next();
    });
  } else {
    res.status(401).json("Error authenticating Token");
  }
};
