const mongoose = require('mongoose');


const productSchema = mongoose.Schema({

  Image: String,
  Name: String,
  Price: Number,
  discount: {
    type: Number,
    default: 0
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,  
});


module.exports = mongoose.model('product', productSchema);