module.exports = async (req, res) => {
  const { email, password, provider, token } = req.body;

  // Register
  if (req.method === 'POST' && !token) {
    const db = require('../database');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    const hashedPassword = await bcrypt.hash(password, 10);
    db.prepare('INSERT INTO users (email, password, username) VALUES (?, ?, ?)').run(email, hashedPassword, email.split('@')[0]);
    const row = db.prepare('SELECT last_insert_rowid() as id').get();
    const userId = row.id;

    const accessToken = jwt.sign({ id: userId, email }, process.env.JWT_SECRET || 'secret');

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 86400
    };
  }

  // Login
  if (req.method === 'POST' && token) {
    const db = require('../database');
    const jwt = require('jsonwebtoken');

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return { error: 'User not found' };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { error: 'Invalid password' };

    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret');

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 86400,
      user: { id: user.id, email: user.email, username: user.username }
    };
  }

  // OAuth token exchange
  if (token) {
    return { access_token: token, token_type: 'Bearer' };
  }

  res.status(400).json({ error: 'Invalid request' });
};