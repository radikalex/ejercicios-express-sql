const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const checkIfBodyParamsExist = require('../middlewares/checkIfBodyParamsExist')
const checkIfElementExistsByParam = require('../middlewares/checkIfElementExistsByParam')
const checkIfIdAvalaible = require('../middlewares/checkIfIdAvalaible')

router.use(express.json());

router.post("/", checkIfBodyParamsExist(['idUsers', 'name']), checkIfIdAvalaible('users', 'idUsers'), UserController.createUser);
router.put('/id/:id', checkIfElementExistsByParam('users', 'id', 'idUsers'), UserController.updateUserById);
router.get("/", UserController.getAllUsers);
router.get("/details", UserController.getUserDetails);
router.get("/id/:id", checkIfElementExistsByParam('users', 'id', 'idUsers'), UserController.getUserById);
router.delete("/id/:id", checkIfElementExistsByParam('users', 'id', 'idUsers'), UserController.deleteUserById);

module.exports = router;