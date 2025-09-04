const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
