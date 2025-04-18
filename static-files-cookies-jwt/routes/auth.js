const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// In a real application, you would use a database
const users = [];

// Register route
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // In a real application, you would hash the password
  users.push({ username, password });

  // Create JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  // Set cookie with httpOnly flag
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3600000 // 1 hour
  });

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user exists and password matches
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  // Set cookie with httpOnly flag
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3600000 // 1 hour
  });

  res.json({ message: 'Login successful' });
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
});

module.exports = router; 