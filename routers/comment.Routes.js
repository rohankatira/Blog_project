const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Add new comment
router.post('/add', authMiddleware, commentController.addComment);

// Edit comment form
router.get('/edit/:id', authMiddleware, commentController.renderEditComment);

// Update comment
router.post('/update/:id', authMiddleware, commentController.updateComment);

// Delete comment
router.post('/delete/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
