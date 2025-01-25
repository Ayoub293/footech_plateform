const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post('/user', async (req, res) => {
  debugger; // Check if the request body is being received correctly
  const { name, email, password } = req.body;
  
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    debugger; // After saving user to DB
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    debugger; // If there is an error while saving
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  debugger; // Check if the route is being accessed
  try {
    const users = await User.find();
    debugger; // After retrieving users from DB
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    debugger; // If there is an error while retrieving
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
