const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

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

// Define Transaction schema
const transactionSchema = new mongoose.Schema({
  transactionType: { type: String, required: true },
  name: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Routes

// Add transaction (POST)
app.post('/api/transactions', async (req, res) => {
  const { transactionType, name, item, quantity, price } = req.body;
  try {
    const newTransaction = new Transaction({ transactionType, name, item, quantity, price });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error adding transaction', error });
  }
});

// Get all transactions (GET)
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
