const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name : {type : String, required :  true},
    email : {type : String , required : true, unique : true},
    password : {type : String , required : true},
    created_at : {type : Date, required: true},
    updated_at : {type : Date, required : true},
    isDeleted : {type : Boolean, required : true},
    status : {type: Boolean, required : true}
})

exports.User = mongoose.model("User",userSchema);