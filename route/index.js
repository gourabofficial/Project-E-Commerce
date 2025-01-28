const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../model/product-model');

router.get('/', function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});




// router.get('/shop',isLoggedin, async (req, res) => {
//   try {
//     // Fetch all products from the database
//     const products = await productModel.find();

//     // Pass the products array to the EJS template
//     res.render('shop', { products });
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).send('Failed to fetch products');
//   }
// });




router.get('/shop',isLoggedin, async (req, res) => {
  let product = await productModel.find();
  res.render('shop', { product });
});




module.exports = router;