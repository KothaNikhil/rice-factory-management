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
  dateCreated: { type: Date, default: '', required: true },
  dateUpdated: { type: Date, default: '', required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Routes

// Add transaction (POST)
app.post('/api/transactions', async (req, res) => {
  console.log(req.body);
  const { transactionType, name, item, quantity, price, dateCreated, dateUpdated } = req.body;
  try {
    const newTransaction = new Transaction({ transactionType, name, item, quantity, price, dateCreated, dateUpdated });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error adding transaction', error });
  }
});

// Get all transactions (GET)
app.get('/api/transactions', async (req, res) => {
  const { page = 0, pageSize = 10 } = req.query;
  const skip = parseInt(page) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  try {
    const transactions = await Transaction.find().skip(skip).limit(limit);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error });
  }
});

// Get transaction by ID (GET)
app.get('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transaction', error });
  }
});

// Update transaction (PUT)
app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { transactionType, name, item, quantity, price, dateUpdated } = req.body;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { transactionType, name, item, quantity, price, dateUpdated },
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction', error });
  }
});

// Delete transaction (DELETE)
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
