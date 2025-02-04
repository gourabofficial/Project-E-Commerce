const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../model/product-model');


router.post('/create', upload.single('image'), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    // let success = req.flash('success');
    // let error = req.flash('error');
    let products = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    // req.flash("success", "Product created successfully");
   
    res.redirect("/shop");

  } catch (error) {
    // req.flash( error.message);
  }
});

router.get('/create', async (req, res) => {
  try {
    res.render('createproducts', { product});
  } catch (error) {
    // req.flash('error', 'Something went wrong');
    res.redirect('/admin');
  }
});

module.exports = router;
