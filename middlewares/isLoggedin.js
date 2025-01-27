const jwt = require('jsonwebtoken');
const userModel = require('../model/user-model');


module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
     res.flash("Error", "you are not logged in");
    return res.redirect("/");

  }
try {
  let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
  let user = await userModel
    .findOne({ email: decoded.email })
    .select("-password");
  
  req.user = user;
  next();
} catch (error) {
  req.flash("error", "somthing went wrong");
  req.redirect('/');
}

}
