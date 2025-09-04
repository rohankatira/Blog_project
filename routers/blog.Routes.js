const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// List all blogs
router.get('/', blogController.renderHomePage);

// Create blog – form + submit
router.get('/create', authMiddleware, blogController.renderCreateBlog);
router.post('/create', authMiddleware, uploadMiddleware.single('image'), blogController.createBlog);

// Edit blog – form + submit
router.get('/edit/:id', authMiddleware, blogController.renderEditBlog);
router.post('/update/:id', authMiddleware, uploadMiddleware.single('image'), blogController.updateBlog);

// Delete blog (only owner)
router.post('/delete/:id', authMiddleware, blogController.deleteBlog);

// Blog detail – with comments
router.get('/:id', blogController.renderBlogDetail);

// Like/unlike blog (toggle like)
router.post('/like/:id', authMiddleware, blogController.toggleLike);

module.exports = router;
