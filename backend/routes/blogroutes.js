const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PolarPaintingBlog = require('../models/polarpaintingblog');  // Import the schema model
const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');  // Folder where images and videos will be stored
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique filename with extension
  },
});

// Initialize multer with file validation (allowing only image and video files)
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images and videos are allowed.'));
    }
  },
});

// Create Blog Route (Handling only title, content, and author)
router.post('/blogs', upload.none(), async (req, res) => {
  const { title, content, author } = req.body;

  // Validate required fields
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, Content, and Author are required fields.' });
  }

  try {
    // Create and save the new blog entry (without media and subheadings)
    const blog = new PolarPaintingBlog({
      title,
      content,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,  // Initialize likes count
      views: 0,  // Initialize views count
    });

    // Save the blog to the database
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add blog.' });
  }
});

// Add Subheading to a Blog (Handle subheading title and content)
router.put('/blogs/:id/subheading', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Validate required fields for subheading
  if (!title || !content) {
    return res.status(400).json({ error: 'Subheading Title and Content are required.' });
  }

  try {
    // Find the blog by ID and add subheading
    const blog = await PolarPaintingBlog.findByIdAndUpdate(id, {
      $push: {
        subheadings: { title, content },  // Push new subheading
      },
      updatedAt: new Date(),  // Update the updatedAt field
    }, { new: true });

    // Return the updated blog with new subheading
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add subheading to blog.' });
  }
});

// Get All Blogs Route
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await PolarPaintingBlog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

// Get a Single Blog (View Blog) and Increment Views
router.get('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the blog by ID
    const blog = await PolarPaintingBlog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    // Increment the view count
    blog.views += 1;
    await blog.save();  // Save the updated view count

    res.status(200).json(blog);  // Return the updated blog with views incremented
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blog.' });
  }
});

// Like a Blog Route
router.put('/blogs/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the blog by ID and increment the likes count
    const blog = await PolarPaintingBlog.findByIdAndUpdate(id, {
      $inc: { likes: 1 },  // Increment likes by 1
    }, { new: true });

    // Return the updated blog with the new likes count
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to like blog.' });
  }
});

// Delete Blog Route
router.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await PolarPaintingBlog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.status(200).json({ message: 'Blog deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete blog.' });
  }
});

module.exports = router;
