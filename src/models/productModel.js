const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result);
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [[productId]],
  );
  return camelize(product);
};

const insert = async (product) => {
  const columns = Object.keys(snakeize(product)).join(', ');
  const placeholders = Object.keys(product).map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUES (${placeholders})`,
    [...Object.values(product)],
  );
  return insertId;
};

const update = async (id, name) => {
  await connection.execute(
    `UPDATE products SET name =?
    WHERE id = ?`,
    [name, id],
  );
  const product = await getById(id);
  return product;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteProduct,
};
