const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).send(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productsById = await productsService.getById(id);
  if (productsById.message) return res.status(404).json({ message: productsById.message });
  return res.status(200).json(productsById);
};

const insert = async (req, res) => {
  const inserts = await productsService.insert(req.body);
  return res.status(201).json(inserts);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updates = await productsService.update(id, name);
  return res.status(200).json(updates);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productsService.deleteProduct(id);
  return res.status(204).end();
};

const handleSearch = async (req, res) => {
  const { q } = req.query;
  const search = await productsService.handleSearch(q);
  res.status(200).json(search);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteProduct,
  handleSearch,
};
