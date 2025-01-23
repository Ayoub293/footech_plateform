// -------------------------------
// Import Required Modules
// -------------------------------
require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Logging requests
const routes = require('./routes'); // Import routes from routes folder

// -------------------------------
// Initialize Express App
// -------------------------------
const app = express();

// -------------------------------
// Middleware
// -------------------------------
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Log requests in development

// -------------------------------
// MongoDB Connection
// -------------------------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/footech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// -------------------------------
// Routes
// -------------------------------
app.use('/api', routes); // Use routes defined in the routes folder

// Example route for testing
app.get('/', (req, res) => {
  res.status(200).send('Welcome to fooTech Server! 🚀');
});

// -------------------------------
// Error Handling Middleware
// -------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ error: 'Something went wrong!' });
});

// -------------------------------
// Start the Server
// -------------------------------
const PORT = process.env.PORT || 5000; // Get PORT from .env or use 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


