module.exports = async (req, res) => {
  const db = require('../database');
  
  if (req.method === 'GET') {
    const videos = db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();
    return { videos };
  }
  
  if (req.method === 'POST') {
    const { title, url, user_id } = req.body;
    const stmt = db.prepare('INSERT INTO videos (user_id, title, url) VALUES (?, ?, ?)');
    const info = stmt.run(user_id || 1, title || 'Untitled', url || '');
    return { id: info.lastInsertRowid, success: true };
  }
  
  res.status(405).json({ error: 'Method not allowed' });
};