
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Firm schema
const firmSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now, required: true },
  dateUpdated: { type: [Date], default: [], required: true },
});

// Hash password before saving
firmSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = {
  Firm
};