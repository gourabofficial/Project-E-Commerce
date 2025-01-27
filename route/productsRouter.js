const express = require('express');
const router = express.Router();
const productModel = require('../model/product-model');

router.get('/', async (req, res) => {
  try {
    const products = await productModel.find();
    res.render('shop', { products: products, error: req.flash("error") });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect('/');
  }
});

module.exports = router;