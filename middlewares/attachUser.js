const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id).lean();
    req.user = user || null;
  } catch (error) {
    req.user = null;
  }

  next();
};
