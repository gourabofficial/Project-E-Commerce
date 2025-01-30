
const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../model/product-model');



router.get('/shop', isLoggedin, async (req, res) => {
  try {
    let products = await productModel.find(); 
    console.log(products); 
    res.render('shop', { products }); 
  } catch (error) {
    console.error("Error fetching products:", error.message);
    req.flash("error", "Could not load products.");
    res.redirect('/');
  }
});



module.exports = router;
