const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const checkIfBodyParamsExist = require('../middlewares/checkIfBodyParamsExist')
const checkIfElementExistsByParam = require('../middlewares/checkIfElementExistsByParam')
const checkIfIdAvalaible = require('../middlewares/checkIfIdAvalaible')

router.use(express.json());

router.post('/', checkIfBodyParamsExist(['idProducts', 'name', 'price', 'id_category']), checkIfIdAvalaible('products', 'idProducts'), ProductController.createProduct);
router.put('/id/:id', checkIfElementExistsByParam('products', 'id', 'idProducts'), ProductController.updateProductById);
router.get('/', ProductController.getAllProducts);
router.get('/products_categories', ProductController.getAllProductsWithCategory);
router.get('/id/:id', checkIfElementExistsByParam('products', 'id', 'idProducts'), ProductController.getProductById);
router.get('/price_desc', ProductController.getAllProductsPriceDesc);
router.get('/name/:name', checkIfElementExistsByParam('products', 'name', 'name'), ProductController.getProductByName);
router.delete('/id/:id', checkIfElementExistsByParam('products', 'id', 'idProducts'), ProductController.deleteProductById);

module.exports = router;