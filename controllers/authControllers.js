
const userModel = require('../model/user-model');
const productModel = require('../model/product-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken')



module.exports.registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if(user) return res.status(401).send("you already have account ")

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });
          let token = generateToken(user)
          res.cookie("token", token);
          res.send("User created successfully");
        }
      })
    });


  }
  catch (error) {
    res.send(error.message);
  }
}







// module.exports.loginUser = async function (req, res) {
//   let { email, password } = req.body;

//   try {
//     let user = await userModel.findOne({ email: email });
//     if (!user) {
//       return res.render("shop", { error: "Email or Password incorrect" }); // Render with error
//     }

//     bcrypt.compare(password, user.password, function (err, result) {
//       if (result) {
//         let token = generateToken(user);
//         res.cookie("token", token);
//         res.redirect("/shop"); // Redirect to shop
//       } else {
//         res.render("shop", { error: "Email or Password incorrect" }); // Render with error
//       }
//     });
//   } catch (err) {
//     console.error("Error logging in user:", err);
//     res.render("shop", { error: "An unexpected error occurred. Please try again later." });
//   }
// };


module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email: email });
    if (!user) {
      req.flash("error", "Email or Password incorrect");
      return res.redirect('/');
    }

    bcrypt.compare(password, user.password, function (err, result) { 
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        req.flash("error", "Email or Password incorrect");
        res.redirect('/');
      }
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect('/');
  }
};


module.exports.logoutUser = async function (req, res) {
  res.cookie("token","");
  res.redirect("/");
}