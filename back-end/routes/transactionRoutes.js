const express = require('express');
const router = express.Router();
const { Transaction } = require('../services/transactionService');
const authenticate = require('../middleware/authenticate');

// Add transaction (POST)
router.post('/', authenticate, async (req, res) => {
  const { transactionType, name, item, quantity, price, amount, dateCreated } = req.body;
  try {
    const transaction = new Transaction({
      transactionType,
      name,
      item,
      quantity,
      price,
      amount,
      dateCreated: dateCreated || new Date(),
      dateUpdated: [new Date()],
      firmId: req.firmId // Set firmId from authenticated user
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error adding transaction', error });
  }
});

// Get all transactions (GET)
router.get('/', authenticate, async (req, res) => {
  const { page = 0, pageSize = 10 } = req.query;
  const skip = parseInt(page) * parseInt(pageSize);
  const limit = parseInt(pageSize);
  console.log('firmId', req.firmId);
  try {
    const transactions = await Transaction.find({ firmId: req.firmId }).skip(skip).limit(limit); // Filter by firmId
    console.log('transactions', transactions);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error });
  }
});

// Get all transaction names (GET)
router.get('/names', authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ firmId: req.firmId }).select('name -_id'); // Filter by firmId
    const names = [...new Set(transactions.map(transaction => transaction.name))];
    res.status(200).json(names);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transaction names', error });
  }
});

// Get transaction by ID (GET)
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findOne({ _id: id, firmId: req.firmId }); // Filter by firmId
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transaction', error });
  }
});

// Update transaction (PUT)
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { transactionType, name, item, quantity, price, amount, dateCreated } = req.body;
  try {
    const transaction = await Transaction.findOne({ _id: id, firmId: req.firmId }); // Filter by firmId
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    transaction.transactionType = transactionType;
    transaction.name = name;
    transaction.item = item;
    transaction.quantity = quantity;
    transaction.price = price;
    transaction.amount = amount;
    transaction.dateCreated = dateCreated || transaction.dateCreated;
    transaction.dateUpdated.push(new Date());
    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction', error });
  }
});

// Delete transaction (DELETE)
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({ _id: id, firmId: req.firmId }); // Filter by firmId
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction', error });
  }
});

module.exports = router;