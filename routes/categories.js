const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')
const checkIfBodyParamsExist = require('../middlewares/checkIfBodyParamsExist')
const checkIfElementExistsByParam = require('../middlewares/checkIfElementExistsByParam')
const checkIfIdAvalaible = require('../middlewares/checkIfIdAvalaible')

router.use(express.json());

router.post('/', checkIfBodyParamsExist(['idCategories', 'name']), checkIfIdAvalaible('categories', 'idCategories'), CategoryController.createCategory);
router.put('/id/:id', checkIfElementExistsByParam('categories', 'id', 'idCategories'), CategoryController.updateCategoryById);
router.get('/', CategoryController.getAllCategories);
router.get('/id/:id', checkIfElementExistsByParam('categories', 'id', 'idCategories'), CategoryController.getCategoryById);

module.exports = router;