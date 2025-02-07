const express = require('express');
const router = express.Router();
const { Firm } = require('../services/firmService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

// Register firm (POST)
router.post('/register', async (req, res) => {
  console.log(req.body);
  const { name, email, password, address, phone } = req.body;
  try {
    const firm = new Firm({ name, email, password, address, phone });
    await firm.save();
    res.status(201).json({ message: 'Firm registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering firm', error });
  }
});

// Login firm (POST)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const firm = await Firm.findOne({ email });
    if (!firm || !(await bcrypt.compare(password, firm.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: firm._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token }); // Return the token in the response
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
});

// Get firm data (GET)
router.get('/firm', authenticate, async (req, res) => {
  try {
    const firm = await Firm.findById(req.firmId);
    if (!firm) {
      return res.status(404).json({ message: 'Firm not found' });
    }
    res.status(200).json(firm);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching firm data', error });
  }
});

// Update firm data (PUT)
router.put('/firm', authenticate, async (req, res) => {
  console.log('update firm:', req.body);
  const { name, email, password, address, phone } = req.body;
  try {
    const firm = await Firm.findById(req.firmId);
    if (!firm) {
      console.log("Firm not found");
      return res.status(404).json({ message: 'Firm not found' });
    }
    firm.name = name || firm.name;
    firm.email = email || firm.email;
    firm.password = password || firm.password;
    firm.address = address || firm.address;
    firm.phone = phone || firm.phone;
    firm.dateUpdated.push(new Date());
    await firm.save();
    res.status(200).json({ message: 'Firm updated successfully', firm });
  } catch (error) {
    res.status(400).json({ message: 'Error updating firm data', error });
  }
});

module.exports = router;