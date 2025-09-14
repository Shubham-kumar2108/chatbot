const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;