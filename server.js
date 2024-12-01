const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename with timestamp
  },
});
const upload = multer({ storage });

// Serve static files and uploads
app.use(express.static('uploads'));

// Handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  res.json({ url: fileUrl }); // Return image URL
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
