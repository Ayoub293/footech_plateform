const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('fooTech API Routes are working');
});

// Example route for testing
router.get('/example', (req, res) => {
    res.send('This is an example route from routes/index.js');
});

module.exports = router;

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Database connection error:', error));

// Routes
app.get('/', (req, res) => {
    res.send('fooTech API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

