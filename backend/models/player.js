const mongoose = require('mongoose');

// تعريف الـ Schema الخاص باللاعب
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  stats: {
    goals: {
      type: Number,
      default: 0,
    },
    assists: {
      type: Number,
      default: 0,
    },
    matchesPlayed: {
      type: Number,
      default: 0,
    },
  },
});

// إنشاء الـ Model من الـ Schema
const Player = mongoose.model('Player', playerSchema);

// تصدير الـ Model لاستخدامه في باقي أجزاء المشروع
module.exports = Player;

