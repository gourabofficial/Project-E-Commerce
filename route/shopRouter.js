
const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../model/product-model');



router.get('/shop', isLoggedin, async (req, res) => {
  try {
    let products = await productModel.find();
    res.render('shop', { products  });
  } catch (error) {
    res.status(500).send("Could not load products.");
  }
});


module.exports = router;
