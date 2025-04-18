const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { verifyToken }; 