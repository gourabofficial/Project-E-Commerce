

const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../model/product-model');


router.post('/create', upload.single('image'), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    let products = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully");
    // res.redirect("/owners/admin");
    res.redirect("/shop");

  } catch (error) {
    req.flash( error.message);
  }
});

module.exports = router;
