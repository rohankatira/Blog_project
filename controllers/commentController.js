const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;
    if (!text || !blogId) return res.redirect(`/blogs/${blogId || ''}`);

    const comment = new Comment({
      blog: blogId,
      user: req.user.id,
      text,
      createdAt: new Date(),
    });
    await comment.save();
    res.redirect(`/blogs/${blogId}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

exports.renderEditComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).lean();
    if (!comment) return res.status(404).render('error', { error: 'Comment not found', user: req.user });
    if (comment.user.toString() !== req.user.id) return res.status(403).render('error', { error: 'Not authorized', user: req.user });

    res.render('comments/edit', { comment, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).render('error', { error: 'Comment not found', user: req.user });
    if (comment.user.toString() !== req.user.id) return res.status(403).render('error', { error: 'Not authorized', user: req.user });

    comment.text = req.body.text;
    await comment.save();
    res.redirect(`/blogs/${comment.blog}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).render('error', { error: 'Comment not found', user: req.user });
    if (comment.user.toString() !== req.user.id) return res.status(403).render('error', { error: 'Not authorized', user: req.user });

    const blogId = comment.blog;
    await comment.remove();
    res.redirect(`/blogs/${blogId}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};
