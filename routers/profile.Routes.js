const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Profile detail page
router.get('/', authMiddleware, profileController.getprofile);

// Render edit profile form
router.get('/edit', authMiddleware, profileController.renderEditProfile);

// Handle profile update (with image upload)
router.post('/update', authMiddleware, uploadMiddleware.single('profilePicture'), profileController.updateProfile);

// Delete profile
router.post('/delete', authMiddleware, profileController.deleteProfile);

module.exports = router;
