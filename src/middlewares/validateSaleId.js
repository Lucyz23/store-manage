const listSaleById = require('../services/serviceSale');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const checkId = await listSaleById.listSaleById(id);
  if (!id || checkId.length === 0) { return res.status(404).send({ message: 'Sale not found' }); }
  next();
};
