const productModel = require('../models/productModel');

const getAll = async () => {
  const product = await productModel.getAll();
  return product;
};

const getById = async (productId) => {
  const productsById = productModel.getById(productId);
  if (!productsById) return { message: 'Product not found' };
  return productId;
};

const insert = async (name) => {
  const insertProduct = await productModel.insert(name);
  return { id: insertProduct, name: name.name };
};

const deleteProduct = async (id) => {
  await productModel.deleteProduct(id);
};

const handleSearch = async (query) => {
  const search = await productModel.getAll();
  return search.filter((item) => item.name.includes(query));
};

module.exports = {
  getAll,
  getById,
  insert,
  deleteProduct,
  handleSearch,
};
