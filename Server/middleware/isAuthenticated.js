let jwt = require("jsonwebtoken");

/*
 * Todo: check jwt exp
 * could check jwt size
 */
exports.isAuthenticated = (req, res, next) => {

  let bearerToken = req.headers["authorization"];

  if(typeof bearerToken == "undefined") {
    //next(); // keep this commented until I need to generate another valid jwt
    // send challenge back to client
    res.sendStatus(401);

  } else if(bearerToken.split(' ')[0] == "Bearer") {
    let token = bearerToken.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err) {
        res.sendStatus(401);
        throw err;
      } 
      else {
        req.username = decoded.audience;
        console.log(req.username);
      } next();
    });
  } else { res.sendStatus(401); } 
}
