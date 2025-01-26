const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, "secretkey");
   
};

module.exports.generateToken = generateToken;