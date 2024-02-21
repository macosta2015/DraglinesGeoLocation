const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://atlas-sql-641660637c2f2252f078bbb5-o1ov5.a.query.mongodb.net/test?ssl=true&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Define schema for coordinates
const coordinatesSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number
});

// Define model based on schema
const Coordinates = mongoose.model('Coordinates', coordinatesSchema);

// Define routes
app.post('/coordinates', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    // Create a new instance of Coordinates model
    const coordinates = new Coordinates({ latitude, longitude });
    // Save coordinates to MongoDB
    await coordinates.save();
    console.log("Coordinates saved:", { latitude, longitude });
    res.status(201).json({ message: 'Coordinates saved successfully' });
  } catch (error) {
    console.error('Error saving coordinates:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://atlas-sql-641660637c2f2252f078bbb5-o1ov5.a.query.mongodb.net/test?ssl=true&authSource=admin', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error(err));

// // Routes
// // Define your routes here

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
