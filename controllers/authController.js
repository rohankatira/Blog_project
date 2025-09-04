const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Render signup page
exports.renderSignup = (req, res) => {
  res.render('auth/signup', { error: null, user: null });
};

// Handle user signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) return res.render('auth/signup', { error: 'Email already exists', user: null });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.redirect('/auth/signin');
  } catch (error) {
    res.render('error', { error: error.message, user: null });
  }
};

// Render signin page
exports.renderSignin = (req, res) => {
  res.render('auth/signin', { error: null, user: null });
};

// Handle user signin
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render('auth/signin', { error: 'Invalid credentials', user: null });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.render('auth/signin', { error: 'Invalid credentials', user: null });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    res.render('error', { error: error.message, user: null });
  }
};

// Handle user logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/signin');
};
