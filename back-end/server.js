const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');
const firmRoutes = require('./routes/firmRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (for MongoDB, you can replace with your database connection string)
mongoose.connect('mongodb://localhost:27017/rice-factory');

// Check DB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/firms', firmRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
