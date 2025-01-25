const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// استدعاء الميدل وير و التحقق من البيانات
const authMiddleware = require('./middleware/authMiddleware');
const validateUser = require('./utils/validation');

// Database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Sample Route (for testing)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route محمي باستخدام authMiddleware
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route!');
});

// Route التسجيل مع التحقق من البيانات
app.post('/register', validateUser, (req, res) => {
  res.send('User registered successfully');
});

// Starting the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
