module.exports = function (req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next(); // Allow access
  }

  req.flash('error', 'You do not have permission to access this page.');
  res.redirect('/');
};