const express = require('express');
const router = express.Router();

// Available themes
const THEMES = ['light', 'dark', 'blue', 'green'];

// Get current theme
router.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.json({ theme });
});

// Set theme
router.post('/', (req, res) => {
  const { theme } = req.body;
  
  // Validate theme
  if (!theme || !THEMES.includes(theme)) {
    return res.status(400).json({ 
      message: 'Invalid theme', 
      availableThemes: THEMES 
    });
  }

  // Set cookie for theme preference
  res.cookie('theme', theme, {
    maxAge: 31536000000, // 1 year
    httpOnly: false // Allow JS to access the cookie
  });
  
  res.json({ message: `Theme set to ${theme}` });
});

module.exports = router; 