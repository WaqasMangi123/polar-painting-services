const mongoose = require('mongoose');

const subheadingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const polarPaintingBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },  // Added views field
  subheadings: [subheadingSchema],
});

const PolarPaintingBlog = mongoose.model('PolarPaintingBlog', polarPaintingBlogSchema);

module.exports = PolarPaintingBlog;
