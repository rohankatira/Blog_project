const Blog = require('../models/Blog');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

// List all blogs
exports.renderHomePage = async (req, res) => {
  try {
    const blogs = await Blog.find().lean();
    res.render('blogs/index', { blogs, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

// Render create blog form
exports.renderCreateBlog = (req, res) => {
  res.render('blogs/create', { error: null, user: req.user });
};

// Create blog submission
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.render('blogs/create', { error: 'Title and content are required!', user: req.user });
    }
    const blog = new Blog({
      author: req.user.id,
      title,
      content,
      image: req.file ? req.file.filename : null,
    });
    await blog.save();
    res.redirect(`/blogs/${blog._id}`);
  } catch (err) {
    console.error(err);
    res.render('blogs/create', { error: 'Error creating blog', user: req.user });
  }
};

// Render edit blog form
exports.renderEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) return res.status(404).render('error', { error: 'Blog not found', user: req.user });
    if (blog.author.toString() !== req.user.id) return res.status(403).render('error', { error: 'Not authorized', user: req.user });
    res.render('blogs/edit', { blog, error: null, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

// Update blog submit
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).render('error', { error: 'Blog not found', user: req.user });
    if (blog.author.toString() !== req.user.id) return res.status(403).render('error', { error: 'Not authorized', user: req.user });
    blog.title = req.body.title;
    blog.content = req.body.content;
    if (req.file) blog.image = req.file.filename;
    await blog.save();
    res.redirect(`/blogs/${blog._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).render('error', { error: 'Blog not found', user: req.user });
    if (blog.author.toString() !== req.user.id) return res.status(403).render('error', { error: 'Not authorized', user: req.user });
    await blog.remove();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

// Render blog detail with comments and likes count
exports.renderBlogDetail = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username').lean();
    if (!blog) return res.status(404).render('error', { error: 'Blog not found', user: req.user });

    const comments = await Comment.find({ blog: req.params.id })
      .populate('user', 'username')
      .lean();

    const likesCount = await Like.countDocuments({ blog: req.params.id, liked: true });

    res.render('blogs/detail', { blog, comments, likesCount, user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};

// Toggle like/unlike blog
exports.toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ blog: blogId, user: userId });

    if (existingLike) {
      await existingLike.remove();
    } else {
      await Like.create({ blog: blogId, user: userId, liked: true });
    }

    res.redirect(`/blogs/${blogId}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Internal Server Error', user: req.user });
  }
};
