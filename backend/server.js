const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
const connectionString = 'mongodb+srv://macosta1997:<password>@atlas-sql-641660637c2f2252f078bbb5-o1ov5.mongodb.net/Draglines?ssl=true';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema
const coordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const Coordinate = mongoose.model('Coordinate', coordinateSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle saving coordinates
app.post('/coordinates', async (req, res) => {
  const { latitude, longitude } = req.body;
  
  try {
    // Save coordinates to MongoDB
    const coordinate = new Coordinate({ latitude, longitude });
    await coordinate.save();
    res.status(201).send('Coordinates saved successfully');
  } catch (error) {
    console.error('Error saving coordinates:', error);
    res.status(500).send('Error saving coordinates');
  }
});

// Route to handle requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the backend server'); // Modify this response as needed
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://atlas-sql-641660637c2f2252f078bbb5-o1ov5.a.query.mongodb.net/test?ssl=true&authSource=admin', {
// // mongoose.connect('mongodb://localhost:27017/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Define schema
// const coordinateSchema = new mongoose.Schema({
//   latitude: Number,
//   longitude: Number,
// });

// const Coordinate = mongoose.model('Coordinate', coordinateSchema);

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Route to handle saving coordinates
// app.post('/coordinates', async (req, res) => {
//   const { latitude, longitude } = req.body;
  
//   try {
//     // Save coordinates to MongoDB
//     const coordinate = new Coordinate({ latitude, longitude });
//     await coordinate.save();
//     res.status(201).send('Coordinates saved successfully');
//   } catch (error) {
//     console.error('Error saving coordinates:', error);
//     res.status(500).send('Error saving coordinates');
//   }
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

