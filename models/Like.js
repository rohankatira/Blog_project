const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  liked: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
