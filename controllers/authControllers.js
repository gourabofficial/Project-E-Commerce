
const userModel = require('../model/user-model');
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

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) res.send("Email or Password incorrect");

  bcrypt.compare(password, user.password, function (err, result) { 
    if (result) {
      let token = generateToken(user)
      res.cookie("token", token)
      res.send("you can Login ")
    }
    else {
      res.send("Email or Password incorrect");
    }
  })
}