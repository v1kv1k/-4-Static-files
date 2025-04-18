const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const themeRoutes = require('./routes/theme');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engines setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Default engine
app.engine('ejs', require('ejs').__express);

// Routes
app.use('/auth', authRoutes);
app.use('/theme', themeRoutes);
app.use('/protected', protectedRoutes);

// Home route
app.get('/', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('pug/index', { 
    title: 'Express App with Static Files, Cookies, and JWT',
    theme
  });
});

// EJS example route
app.get('/ejs-example', (req, res) => {
  const theme = req.cookies.theme || 'light';
  res.render('ejs/index.ejs', { 
    title: 'EJS Example',
    theme
  });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 