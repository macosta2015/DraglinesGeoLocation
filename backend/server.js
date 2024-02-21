const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://atlas-sql-641660637c2f2252f078bbb5-o1ov5.a.query.mongodb.net/test?ssl=true&authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
// Define your routes here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
