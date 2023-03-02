const service = require('../services/serviceSale');

const insertSales = async (req, res) => {
  const insertId = await service.insertOnSales();
  await service.insertSales(req.body, insertId);
  return res.status(201).send({ id: +insertId, itemsSold: [...req.body] });
};

const listAllSales = async (req, res) => {
  const sales = await service.listAllSales();
  // console.log(sales);
  return res.status(200).json(sales);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const saleById = await service.listSaleById(id);
  if (saleById.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(saleById);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  console.log('controler', id);
  const saleUpdate = await service.updateSale(id, product);
  return res.status(200).json(saleUpdate);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  await service.deleteSale(id);
  return res.status(204).end();
};

module.exports = {
  insertSales,
  listAllSales,
  listSaleById,
  updateSale,
  deleteSale,
};
