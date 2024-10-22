const express = require('express');
const transController = require('../controllers/transaction');
router = express.Router();

router.post('/addtransaction',transController.addTransactions);
router.get('/get-transactions',transController.getTransactions);
router.get('/get-transaction/:id',transController.getTransaction);
router.post('/update-transaction/:id',transController.updateTransaction);
router.delete('/delete-transaction/:id',transController.deleteTransaction);
module.exports = router;