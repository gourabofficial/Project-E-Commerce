
const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const userModel = require('../model/user-model');


router.get('/addtocart/:id', isLoggedin, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.cart.push(req.params.id);
    await user.save();
    res.redirect('/shop');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//remove product  
router.post('/cart/remove/:id', isLoggedin, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.cart = user.cart.filter(item => item && item.toString() !== req.params.id);
    await user.save();
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/cart', isLoggedin, async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('cart', { cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
