const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../model/product-model');



router.get('/shop', isLoggedin, async (req, res) => {
  try {
    let products = await productModel.find(); // Fetch products from the database
    console.log(products); // Debug: Check if products are fetched correctly
    res.render('shop', { products }); // Pass products to the EJS template
  } catch (error) {
    console.error("Error fetching products:", error.message);
    req.flash("error", "Could not load products.");
    res.redirect('/');
  }
});



module.exports = router;