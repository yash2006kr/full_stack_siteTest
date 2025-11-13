const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

 

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login (supports email or username)
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or username

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Please use Google login for this account' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret_key_change_in_production', { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), async (req, res) => {
  try {
    const user = req.user;
    // Directly issue token without OTP verification
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret_key_change_in_production', { expiresIn: '1h' });
    const clientBase = process.env.CLIENT_URL || 'https://full-stack-sitetest-frontend.onrender.com';
    const isNew = user && user.wasJustCreated;
    const targetPath = isNew ? '/register' : '/login';
    const extra = isNew ? '&registered=1' : '';
    res.redirect(`${clientBase}${targetPath}?token=${token}${extra}`);
  } catch (error) {
    const clientBase = process.env.CLIENT_URL || 'https://full-stack-sitetest-frontend.onrender.com';
    res.redirect(`${clientBase}/login?error=oauth_error`);
  }
});

module.exports = router;
