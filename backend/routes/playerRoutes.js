const express = require("express");
const router = express.Router();
const Player = require("../models/Player");

// Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new player
router.post("/", async (req, res) => {
  const { name, age, position, club } = req.body;

  try {
    const newPlayer = new Player({ name, age, position, club });
    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
