const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Use Express's built-in JSON parsing middleware
router.use(express.json());

// Set up Nodemailer transporter using Gmail credentials from .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME, // Your Gmail address from .env
    pass: process.env.GMAIL_PASSWORD, // Your Gmail password from .env (use App Password if 2FA enabled)
  },
});

// Route to handle contact form submission
router.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation: Ensure all fields are present
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Validate email format
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Phone validation (optional - can adjust as needed)
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Phone number must be between 10-15 digits.' });
  }

  // Prepare email content
  const mailOptions = {
    from: process.env.GMAIL_USERNAME, // Sender email (your Gmail)
    to: process.env.GMAIL_USERNAME, // Recipient email (your Gmail)
    subject: `Contact Form Submission from ${name}`,
    text: `
      You have received a new message from:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}
    `,
  };

  try {
    // Send email using Nodemailer
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Message sent successfully!', info });
  } catch (error) {
    console.error('Error sending email:', error);
    // More specific error messages for different types of issues
    if (error.responseCode === 535) {
      return res.status(500).json({ error: 'Authentication failed. Check your Gmail credentials.' });
    }
    return res.status(500).json({ error: 'Failed to send the message. Please try again later.' });
  }
});

module.exports = router;
