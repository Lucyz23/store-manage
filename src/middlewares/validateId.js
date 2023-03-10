const productService = require('../services/productsService');

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const getId = await productService.getAll();
    const checkId = getId.map((item) => item.id);

  if (!checkId.includes(Number(id))) {
    return res.status(404)
      .send({ message: 'Product not found' });
  }
    next();
  };
