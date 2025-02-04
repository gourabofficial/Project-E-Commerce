// const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//   return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY,);
   
// };

// module.exports.generateToken = generateToken;



const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // Ensure the user object has the required fields
  if (!user.email || !user._id) {
    throw new Error('User object must contain email and _id');
  }

  // Generate the JWT token
  return jwt.sign(
    { email: user.email, id: user._id }, // Payload
    process.env.JWT_KEY, // Secret key
    { expiresIn: '1h' } // Token expiration (optional but recommended)
  );
};

module.exports = { generateToken };