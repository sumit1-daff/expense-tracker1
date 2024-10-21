const model = require('../models/transaction');
const Transaction = model.Transaction;

exports.addTransactions = async (req, res) =>{
    const {name , description, date, category , subcategory, amount} = req.body;
    const transaction = new Transaction({
        title : name,
        transaction_type : category,
        category : subcategory,
        amount : amount,
        date : date,
        description : description
    });
    await transaction.save();
    res.status(200).json({message : 'Transaction added '});
}

exports.getTransaction = async (req, res) =>{
    console.log("getting the transactions");
    const transactions = await Transaction.find();
    console.log(transactions);
    res.status(200).json(transactions);
}