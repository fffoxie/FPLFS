module.exports = async (req, res) => {
  const db = require('../database');
  const jwt = require('jsonwebtoken');
  
  // Get user from token
  const authHeader = req.headers.authorization;
  if (!authHeader) return { error: 'No authorization header' };
  
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
  
  if (req.method === 'GET') {
    const user = db.prepare('SELECT id, email, username, created_at FROM users WHERE id = ?').get(decoded.id);
    return { user };
  }
  
  if (req.method === 'PUT') {
    const { username } = req.body;
    db.prepare('UPDATE users SET username = ? WHERE id = ?').run(username, decoded.id);
    return { success: true };
  }
  
  res.status(405).json({ error: 'Method not allowed' });
};