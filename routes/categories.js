const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')

router.use(express.json());

router.post('/', CategoryController.createCategory);
router.put('/id/:id', CategoryController.updateCategoryById);
router.get('/', CategoryController.getAllCategories);
router.get('/id/:id', CategoryController.getCategoryById);

module.exports = router;