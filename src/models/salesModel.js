const camelize = require('camelize');

const connection = require('./connection');

const insertOnSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales(date) VALUES(NOW())',
  );
  return insertId;
};
const insertSales = async (product, saleId) => {
  const insertId = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [saleId, product.productId, product.quantity],
  );
  return insertId;
};

const listAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT id AS saleId, date, product_id, quantity
    FROM sales AS s ON s.id = sd.sale_id;`,
  );
  return camelize(result);
};

const listSaleById = async (saleId) => {
  const [sales] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales AS sd
   ON s.id = sd.sale_id AND s.id= ?
   ORDER BY s.id, sd.product_id;`,
    [saleId],
  );
  return camelize(sales);
};

const updateSale = async (id, product) => {
  await connection.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  );
  const productA = product.map((item) => insertSales(item, id));
  await Promise.all(productA);

  const saleUpdate = await listSaleById(id);
  return saleUpdate;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ? ',
    [id],
  );
};

  module.exports = {
    listAllSales,
    listSaleById,
    insertOnSales,
    insertSales,
    updateSale,
    deleteSale,
};
