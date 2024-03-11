// Coordinate.js

const mongoose = require('mongoose');

// Define schema
const coordinateSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

// Create model
const Coordinate = mongoose.model('Coordinate', coordinateSchema);

module.exports = Coordinate;
