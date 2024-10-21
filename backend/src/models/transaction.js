const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    title : {required : true, type : String},
    amount : {required :  true, type : Number},
    transaction_type : {type : String , required : true, default : "income"},
    description : {required : true, type : String},
    category : {required : true, type : String, default : "paisa"},
    date : {required : true, type : Date},
})

exports.Transaction = mongoose.model("Transaction",transactionSchema);