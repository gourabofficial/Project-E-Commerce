const express = require('express');
const router = express.Router();
const userModel= require('../model/user-model');
const ownerModel = require('../model/owner-model');

const isLoggedIn = require('../middlewares/isLoggedin');
const isAdmin = require('../middlewares/isAdmin');
const bcrypt = require('bcrypt');






router.post('/create', isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate input data
    if (!fullname || !email || !password) {
      req.flash('error', 'All fields are required');
      return res.redirect('/admin');
    }

    // Check if an admin already exists
    const existingAdmin = await ownerModel.findOne({ role: 'admin' });
    if (existingAdmin) {
      req.flash('error', 'An admin already exists. Only one admin is allowed.');
      return res.redirect('/admin');
    }

    // Check if the email is already registered
    const existingUser = await ownerModel.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already exists');
      return res.redirect('/admin');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new owner (admin)
    await ownerModel.create({
      fullname,
      email,
      password: hashedPassword,
      role: 'admin', // Explicitly set the role as admin
    });

    req.flash('success', 'Admin created successfully');
    res.render('adminLogin'); // Redirect to admin login page , i will implement 
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.redirect('/admin');
  }
});



 router.get('/admin', isLoggedIn, isAdmin, (req, res) => {
    try {
      let success = req.flash('success');
      let error = req.flash('error');
      res.render('adminPanel', { success,error, user: req.user }); // Render the admin panel
    } catch (error) {
      req.flash('error', 'Could not load admin panel.');
      res.redirect('/');
    }
  });


module.exports = router;



