module.exports = async (req, res) => {
  const db = require('../database');
  
  if (req.method === 'GET') {
    const characters = db.prepare('SELECT * FROM characters').all();
    return { characters };
  }
  
  if (req.method === 'POST') {
    const { user_id, name, outfit } = req.body;
    const stmt = db.prepare('INSERT INTO characters (user_id, name, outfit) VALUES (?, ?, ?)');
    const info = stmt.run(user_id || 1, name || 'New Character', outfit || '{}');
    return { id: info.lastInsertRowid, success: true };
  }
  
  res.status(405).json({ error: 'Method not allowed' });
};