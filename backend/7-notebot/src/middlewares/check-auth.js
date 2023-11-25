//middleware for handling authentication using JSON Web Tokens (JWT) --> verifying identity of user
const jwt = require("jsonwebtoken"); //import module

module.exports = (req, res, next) => { //export function
  try {
    const token = req.headers.authorization.split(" ")[0]; // jwt to be included in authorization header of http request

    if (!token) {
      return res.status(401).json({ message: "Authentication failed !!" }); // no token in header:: error
    }
    const decodedToken = jwt.verify(token, "dont share"); // successful: decoded token stored 

    req.userData = { userId: decodedToken.userId }; // setting user data in request object

    next();
  } catch (err) { //handling errors
    return res.status(401).json({ message: "Authentication failed !" });
  }
};
