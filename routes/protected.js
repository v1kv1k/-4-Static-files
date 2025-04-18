const express = require('express');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Apply middleware to all routes
router.use(verifyToken);

// Protected route
router.get('/dashboard', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('pug/dashboard', {
    title: 'Protected Dashboard',
    user: req.user,
    theme
  });
});

// Another protected route
router.get('/profile', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('ejs/profile.ejs', {
    title: 'User Profile',
    user: req.user,
    theme
  });
});

// Protected API route
router.get('/data', (req, res) => {
  // Example protected data
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];
  
  res.json({ data, user: req.user });
});

module.exports = router; 