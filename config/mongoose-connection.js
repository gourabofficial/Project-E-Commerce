const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/E-commerce')
  .then(function () {
  console.log("Connected to database");
  })
.catch(function (err) {
  console.log(err);
});

module.exports = mongoose.connection;