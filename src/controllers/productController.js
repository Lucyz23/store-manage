const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).send(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getById(+id);
  return res.status(response.status).send(response.item);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const response = await productsService.insert(name);
  return res.status(response.status).send(response.item);
};

const update = async (req, res) => {
  const { params: { id }, body: { name } } = req;
  const response = await productsService.update({ id: +id, name });
  return res.status(response.status).send(response.item);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.deleteProduct(+id);
  return res.status(response.status).send(response.item);
};

const findProduct = async (req, res) => {
  const { q } = req.query;
  const response = await productsService.find(q.toLowerCase());
  return res.status(response.status).send(response.item);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteProduct,
  findProduct,
};
