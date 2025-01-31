const userModel = require('../model/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
  try {
    console.log('Registration request received:', req.body);

    const { email, password, fullname } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      req.flash('error', 'You already have an account');
      return res.redirect('/register');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Password hashed successfully');

    const newUser = await userModel.create({
      email,
      password: hash,
      fullname,
    });
    console.log('User created:', newUser);

    const token = generateToken(newUser);
    console.log('Token generated:', token);

    res.cookie('token', token, { httpOnly: true });
    console.log('Token cookie set');

    req.flash('success', 'Account created successfully');
    res.redirect('/shop');
  } catch (error) {
    console.error('Error during registration:', error);
    req.flash('error', 'Something went wrong');
    res.redirect('/register');
  }
};

module.exports.loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash('error', 'Email or Password incorrect');
      return res.redirect('/login');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash('error', 'Email or Password incorrect');
      return res.redirect('/login');
    }

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/shop');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/login');
  }
};

module.exports.logoutUser = async function (req, res) {
  try {
    res.clearCookie("token");
    req.flash("success", "You have been logged out successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error during logout:", error);
    req.flash("error", "Something went wrong during logout");
    res.redirect("/");
  }
};