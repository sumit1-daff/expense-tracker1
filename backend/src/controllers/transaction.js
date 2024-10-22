const model = require('../models/transaction');
const Transaction = model.Transaction;

exports.addTransactions = async (req, res) =>{
    const {name , description, date, category , subcategory, amount} = req.body;
    console.log(typeof(req.user._id));
    
    const transactionData = new Transaction({
        owner: req.user._id,
        title : name,
        transaction_type : category,
        category : subcategory,
        amount : amount,
        date : date,
        description : description
    });
    console.log(transactionData);
    
    await transactionData.save();
    res.status(200).json({message : 'Transaction added '});
}

exports.getTransactions = async (req, res) =>{
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
}

exports.getTransaction = async (req, res) =>{
    const {id} =  req.params;
    try{
        const transaction = await Transaction.findOne({ _id : {$eq : id}});
        if(transaction){
            return res.status(200).json(transaction);
        }else{
            console.log("no transaction found with this id");
        }
    }catch(err){
        console.log("Error occured while loading the transaction");
        
    }
    return res.status(400).json({message : "failed to edit the transaction"});
}

exports.updateTransaction = async (req, res) =>{
    const {id} = req.params;
   try{
    await Transaction.findByIdAndUpdate(id, req.body,{new : true});
    return res.status(200).json({message : "Updated the transaction"});
   }catch(err){
    console.log(err);
    }
return res.status(400).json({message : "Internal server error"});
}

exports.deleteTransaction = async (req, res)=>{
    try{
        const {id} = req.params;
        await Transaction.deleteOne({_id : {$eq : id}});
        return res.status(200).json({message : "Transaction deleted successfully"});
    }catch(err){
        console.log(err);
        console.log("Failed to delete the element");
    }
    return res.status(400).json({message : "Failed to delete the transaction"});
}