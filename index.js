const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Serve static files
app.use('/public', express.static(process.cwd() + '/public'));

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Use memoryStorage to avoid saving files to disk
const upload = multer({ storage: storage });

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
