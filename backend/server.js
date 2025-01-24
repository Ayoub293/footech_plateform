// -------------------------------
// Import Required Modules
// -------------------------------
require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// -------------------------------
// Initialize Express App
// -------------------------------
const app = express();

// -------------------------------
// Middleware
// -------------------------------
app.use(cors());
app.use(express.json());

// -------------------------------
// Database Connection
// -------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Database connection error:', error));

// -------------------------------
// Routes
// -------------------------------
app.get('/', (req, res) => {
  res.send('fooTech API is running!');
});

// -------------------------------
// Start Server
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle server errors (Optional)
app.on('error', (err) => {
  console.error('Server error:', err.message);
});

