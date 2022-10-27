const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')
const checkIfBodyParamsExist = require('../middlewares/checkIfBodyParamsExist')
const checkIfIdAvalaible = require('../middlewares/checkIfIdAvalaible')

router.use(express.json());

router.post("/", checkIfBodyParamsExist(['idOrders', 'date', 'id_users', 'products']), checkIfIdAvalaible('orders', 'idOrders'), OrderController.createOrder)
router.get("/", OrderController.getAllOrders)

module.exports = router;