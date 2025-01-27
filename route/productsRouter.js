const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../model/product-model');


router.post('/create', upload.single('image'), async (req, res) => {

  let { name,price,discount,bgcolor,panelcolor,textcolor} = req.body;

  let product = await productModel.create({
    Image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });
  req.flash("success", "Product created successfully");
  res.redirect("/owners/admin");
});

// router.get('/', async (req, res) => {
//   try {
//     const products = await productModel.find();
//     res.render('shop', { products: products, error: req.flash("error") });
//   } catch (error) {
//     req.flash("error", error.message);
//     res.redirect('/');
//   }
// });

module.exports = router;