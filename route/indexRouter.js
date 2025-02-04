
const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedin');

router.get('/', function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false } );
  
});


router.get('addtocart', isLoggedIn,async function (req, res) {
  res.render('cart')
 
 });

 
 

module.exports = router;
