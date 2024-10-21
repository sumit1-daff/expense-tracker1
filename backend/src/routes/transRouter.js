const express = require('express');
const transController = require('../controllers/transaction');
router = express.Router();

router.post('/addtransaction',transController.addTransactions);
router.get('/get-transactions',transController.getTransaction);
module.exports = router;