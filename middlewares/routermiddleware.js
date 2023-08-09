const jwt = require("jsonwebtoken");
//middleware
const jwtMiddleware = (req, res, next) => {
  try {
    //access token from request header
    const token = req.headers["access_token"]; //no token- runtime error
    //validate token - jwt -verify()
    jwt.verify(token, "secretkey123"); //- true/false
    //if token is verified continue the request
    next();
  } catch {
    res.status(404).json("please login");
  }
};
module.exports = jwtMiddleware;
