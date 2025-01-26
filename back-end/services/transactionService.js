
const mongoose = require('mongoose');

// Define Transaction schema
const transactionSchema = new mongoose.Schema({
  transactionType: { 
    type: String, 
    enum: ['purchase', 'sale', 'salary'], 
    required: true 
  },
  name: { type: String, required: true },
  item: { type: String, required: function() { return this.transactionType !== 'salary'; } }, // Conditionally required
  quantity: { type: Number, required: function() { return this.transactionType !== 'salary'; } }, // Conditionally required
  price: { type: Number, required: function() { return this.transactionType !== 'salary'; } }, // Conditionally required
  amount: { type: Number, required: function() { return this.transactionType === 'salary'; } }, // Conditionally required
  dateCreated: { type: Date, default: '', required: true },
  dateUpdated: { type: [Date], default: [], required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  Transaction
};