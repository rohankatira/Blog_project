const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.Routes.js');
const profileRoutes = require('./profile.Routes.js');
const blogRoutes = require('./blog.Routes.js');
const commentRoutes = require('./comment.Routes.js');

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/comments', commentRoutes);
router.use('/', blogRoutes);

module.exports = router;
