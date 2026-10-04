module.exports = async (req, res) => {
  const db = require('../database');

  if (req.method === 'GET') {
    const characters = db.prepare('SELECT * FROM characters').all();
    return { characters };
  }

  if (req.method === 'POST') {
    const { user_id, name, outfit } = req.body;
    db.prepare('INSERT INTO characters (user_id, name, outfit) VALUES (?, ?, ?)').run(user_id || 1, name || 'New Character', outfit || '{}');
    const row = db.prepare('SELECT last_insert_rowid() as id').get();
    return { id: row.id, success: true };
  }

  res.status(405).json({ error: 'Method not allowed' });
};