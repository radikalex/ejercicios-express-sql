const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.use(express.json());

router.post('/', ProductController.createProduct);
router.put('/id/:id', ProductController.updateProductById);
router.get('/', ProductController.getAllProducts);
router.get('/categories', ProductController.getAllProductsWithCategory);
router.get('/id/:id', ProductController.getProductById);
router.get('/price_desc', ProductController.getAllProductsPriceDesc);
router.get('/name/:name', ProductController.getAllProductByName);
router.delete('/id/:id', ProductController.deleteProductById);

module.exports = router;