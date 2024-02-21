const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example route for creating a user
router.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
