module.exports = async (req, res) => {
  const db = require('../database');

  if (req.method === 'GET') {
    const videos = db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();
    return { videos };
  }

  if (req.method === 'POST') {
    const { title, url, user_id } = req.body;
    db.prepare('INSERT INTO videos (user_id, title, url) VALUES (?, ?, ?)').run(user_id || 1, title || 'Untitled', url || '');
    const row = db.prepare('SELECT last_insert_rowid() as id').get();
    return { id: row.id, success: true };
  }

  res.status(405).json({ error: 'Method not allowed' });
};