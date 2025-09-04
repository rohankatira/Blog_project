const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/signin'); // Redirect if no token
  }

  try {
    const decoded = jwt.verify(token, 'secretkey'); // Use your secret key
    req.user = decoded; // Save decoded user info in req.user
    next();
  } catch (err) {
    return res.redirect('/signin'); // Redirect if token invalid
  }
};
