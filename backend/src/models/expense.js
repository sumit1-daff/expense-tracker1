const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    title : {required : true, type : String},
    transaction_type : {type : String , required : true},
    description : {required : true, type : String},
    category : {required : true, type : String},
    date : {required : true, type : Date},
})

const expense = mongoose.model("expense",expenseSchema);

export default expense;