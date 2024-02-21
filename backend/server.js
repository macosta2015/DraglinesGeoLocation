const express = require('express'); // Import express module
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// Your MongoDB connection code

// Define routes
app.post('/coordinates', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    // Save the coordinates to your database here
    console.log("Received coordinates:", { latitude, longitude });
    res.status(201).json({ message: 'Coordinates saved successfully' });
  } catch (error) {
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
