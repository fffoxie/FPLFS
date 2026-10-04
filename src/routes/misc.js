module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return {
      startpack: {
        items: [],
        currency: 1000
      }
    };
  }
  res.status(405).json({ error: 'Method not allowed' });
};