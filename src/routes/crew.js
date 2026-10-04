module.exports = async (req, res) => {
  const db = require('../database');
  
  if (req.method === 'GET') {
    const crews = db.prepare('SELECT * FROM crews').all();
    return { crews };
  }
  
  if (req.method === 'POST') {
    const { name, created_by } = req.body;
    const stmt = db.prepare('INSERT INTO crews (name, created_by) VALUES (?, ?)');
    const info = stmt.run(name, created_by || 1);
    return { id: info.lastInsertRowid, success: true };
  }
  
  if (req.body.action === 'join') {
    const { crew_id, user_id } = req.body;
    db.prepare('INSERT INTO crew_members (crew_id, user_id) VALUES (?, ?)').run(crew_id, user_id || 1);
    return { success: true };
  }
  
  res.status(405).json({ error: 'Method not allowed' });
};