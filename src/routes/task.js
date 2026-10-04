module.exports = async (req, res) => {
  const db = require('../database');
  
  if (req.method === 'GET') {
    const tasks = [];
    return { tasks };
  }
  
  if (req.method === 'POST') {
    const { title, user_id } = req.body;
    return { id: Date.now(), success: true };
  }
  
  res.status(405).json({ error: 'Method not allowed' });
};