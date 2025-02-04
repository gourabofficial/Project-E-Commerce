
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  if (!user.email || !user._id) {
    throw new Error('User object must contain email and _id');
  }

  // Generate the JWT token
  return jwt.sign(
    { email: user.email, id: user._id }, // Payload
    process.env.JWT_KEY, 
    { expiresIn: '1h' } 
  );
};

module.exports = { generateToken };