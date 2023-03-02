const { getById } = require('../services/productsService');

module.exports = async (req, res, next) => {
  const sales = req.body;
  const produtos = await Promise.all(
    sales.map((item) => getById(item.productId)),
  );
  if (produtos.find((item) => item.message)) {
    return res.status(404).send({ message: 'Product not found' });
  }
  next();
};
