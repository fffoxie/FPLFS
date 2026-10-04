module.exports = async (req, res) => {
  const db = require('../database');
  
  if (req.method === 'POST') {
    const { room_id, user_id, message } = req.body;
    return { success: true, message_id: Date.now() };
  }
  
  if (req.method === 'GET') {
    const { room_id } = req.query;
    return { messages: [] };
  }
  
  res.status(405).json({ error: 'Method not allowed' });
};