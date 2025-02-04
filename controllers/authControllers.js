const userModel = require('../model/user-model');
const ownerModel = require('../model/owner-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
  try {
  

    const { email, password, fullname } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      req.flash('error', 'You already have an account');
      return res.redirect('/login');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    const token = generateToken(newUser);

    res.cookie('token', token, { httpOnly: true });
    

    req.flash('success', 'Account created successfully');
    res.redirect('/login');
  } catch (error) {
    console.error('Error during registration:', error);
    req.flash('error', 'Something went wrong');
    res.redirect('/register');
  }
};

module.exports.loginUser = async function (req, res) {
  try {
 

    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    const token = generateToken(user);

    res.cookie('token', token, { httpOnly: true });
   

    req.flash('success', 'Logged in successfully');
    res.redirect('/shop'); 
  } catch (error) {
    console.error('Error during login:', error);
    req.flash('error', 'Something went wrong');
    res.redirect('/login');
  }
};

module.exports.logoutUser = function (req, res) {
  res.clearCookie('token');
  req.flash('success', 'Logged out successfully');
  res.redirect('/login'); 
};