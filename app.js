const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const indexRouter = require('./routers/index.js');
const blogRouter = require('./routers/blog.Routes.js');
const commentRouter = require('./routers/comment.Routes.js');
const profileRouter = require('./routers/profile.Routes.js');
const attachUser = require('./middlewares/attachUser');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());
app.use(attachUser);

// Routes
app.use('/', indexRouter);
app.use('/blogs', blogRouter);
app.use('/comment', commentRouter);
app.use('/profile', profileRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { error: 'Page Not Found', user: req.user || null });
});

module.exports = app;
