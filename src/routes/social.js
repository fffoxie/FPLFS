module.exports = async (req, res) => {
  const db = require('../database');
  
  if (req.method === 'POST') {
    const { video_id, action } = req.body;
    
    if (action === 'like') {
      db.prepare('UPDATE videos SET likes = likes + 1 WHERE id = ?').run(video_id);
      return { success: true, likes: db.prepare('SELECT likes FROM videos WHERE id = ?').get(video_id).likes };
    }
    
    if (action === 'follow') {
      return { success: true };
    }
  }
  
  if (req.method === 'GET') {
    const { q } = req.query;
    if (q) {
      const results = db.prepare('SELECT * FROM users WHERE username LIKE ?').all('%' + q + '%');
      return { users: results };
    }
  }
  
  res.status(400).json({ error: 'Invalid request' });
};