const express = require('express');
const productController = require('../controllers/productController');
const validateName = require('../middlewares/validateName');
const validateId = require('../middlewares/validateId');

const router = express.Router();

router.get('/search', productController.handleSearch);

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', validateName, productController.insert);

router.put('/:id', validateName, validateId, productController.update);

router.delete('/:id', validateId, productController.deleteProduct);

module.exports = router;
