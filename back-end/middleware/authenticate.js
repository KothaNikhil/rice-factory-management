const jwt = require('jsonwebtoken');
const { isTokenInvalidated } = require('../utils/tokenUtils');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
  if (isTokenInvalidated(token)) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.firmId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error });
  }
};

module.exports = authenticate;
