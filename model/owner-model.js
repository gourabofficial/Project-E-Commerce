// owner-model.js
const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin', // Default role is 'admin'
  },
});

module.exports = mongoose.model('owner', ownerSchema);