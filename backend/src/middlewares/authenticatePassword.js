
const model = require('../models/usersModel');
const User = model.User;
const bcrypt = require('bcryptjs');

exports.authenticatePassword = async (req, res, next) =>{
    const user = req.user;
  const { _id } = user;
  const {currentPassword} = req.body;
   try{
    const user = await User.findById(_id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if(isMatch){
        next();
    }else{
        console.log("Invlaid password");
        return res.status(401).json({message : "Invalid password"});
    }
   }catch(error){
    console.log("error occurred",error);
   }
}