const express = require('express');
const router = express.Router();
const ownerModel = require('../model/owner-model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      req.flash('error', 'All fields are required');
      return res.redirect('/admin');
    }

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      req.flash('error', 'Invalid admin credentials');
      return res.redirect('/admin');
    }

    
    const admin = await ownerModel.findOne({ email, role: 'admin' });
    if (!admin) {
      req.flash('error', 'Admin not found');
      return res.redirect('/admin');
    }


    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      req.flash('error', 'Invalid password');
      return res.redirect('/admin');
    }

    req.flash('success', 'Logged in successfully');
    res.render('createproducts',{ success: req.flash('success') });
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.redirect('/admin');
  }
});

router.get('/admin', (req, res) => {
  try {
    let success = req.flash('success');
    let error = req.flash('error');
    res.render('adminPanel', { success, error, user: req.user }); 
  } catch (error) {
    req.flash('error', 'Could not load admin panel.');
    res.redirect('/');
  }
});

module.exports = router;