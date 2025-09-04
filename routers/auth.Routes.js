const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render signup/signin forms
router.get('/signup', authController.renderSignup);
router.post('/signup', authController.signup);
router.get('/signin', authController.renderSignin);
router.post('/signin', authController.signin);
router.get('/logout', authController.logout);

module.exports = router;
