const express = require('express');
const transController = require('../controllers/transaction');
router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware')

router.post('/addtransaction',authMiddleware,transController.addTransactions);
router.get('/get-transactions',authMiddleware,transController.getTransactions);
router.get('/get-transaction/:id',authMiddleware,transController.getTransaction);
router.post('/update-transaction/:id',authMiddleware,transController.updateTransaction);
router.delete('/delete-transaction/:id',authMiddleware,transController.deleteTransaction);
module.exports = router;