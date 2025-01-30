const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require('../model/product-model');

router.get('/', function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});



module.exports = router;