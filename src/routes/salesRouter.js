const express = require('express');
const salesController = require('../controllers/salesController');
const validateIdProduct = require('../middlewares/validateProduct');
const validateSaleId = require('../middlewares/validateSaleId');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', salesController.listAllSales);

router.get('/:id', salesController.listSaleById);

router.post('/', validateSale, validateIdProduct, salesController.insertSales);

router.put('/:id', validateSaleId, validateSale,
  validateIdProduct, salesController.insertSales);

router.delete('/:id', validateSaleId, salesController.deleteSale);

module.exports = router;
