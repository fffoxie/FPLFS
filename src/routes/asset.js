module.exports = async (req, res) => {
  const { type, id } = req.query;
  return {
    url: 'https://example.com/assets/' + type + '/' + id,
    type: type,
    id: id
  };
};