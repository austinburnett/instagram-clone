let jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {

    let bearerToken = req.headers["authorization"];

    if(typeof bearerToken == "undefined") {
        res.status(401).send("Token is undefined");

    } else if(bearerToken.split(' ')[0] == "Bearer") {
        let token = bearerToken.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) {
                res.status(401).send("Token not verified");
                throw err;
            } 
            else {
                req.username = decoded.audience;
                console.log("user_id from auth middleware in routes: " + req.username);
            } next();
        });
    } else { res.status(401).send("Error authenticating Token"); } 
}
