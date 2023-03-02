const salesModel = require('../models/salesModel');

const insertSale = async (sales, insertId) => {
  const salesA = await sales.map((item) =>
    salesModel.insertSales(item, insertId));
  await Promise.all(salesA);
  return insertId;
};

const insertOn = async () => {
  const insertId = await salesModel.insertOn();
  console.log('insertOnSales services', insertId);
  return insertId;
};

const listAll = async () => {
  const sales = await salesModel.listAll();
  return sales;
};

const listSaleId = async (saleId) => {
  const saleById = await salesModel.listSaleId(saleId);
  return saleById;
};

const updateSale = async (id, product) => {
  const productUpdate = await salesModel.updateSale(id, product);
  const productList = productUpdate.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));
  return { saleId: id, itemsUpdated: productList };
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

module.exports = {
  insertSale,
  listAll,
  listSaleId,
  updateSale,
  insertOn,
  deleteSale,
};
