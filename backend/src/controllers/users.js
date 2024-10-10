const model = require('../models/users.js');
const User = model.User;
const bcrypt = require('bcryptjs');
const {status} = require('express');
const jwt = require('jsonwebtoken');

exports.addUser = async (req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = new User({
        name : name,
        email : email,
        password : hashedPassword
    });
    user.save();
  console.log("added sucessfully");
  res.json(user);
}

exports.checkIfExists = async (req, res) =>{
    const {email} = req.body;
    const user = await User.findOne({email : {$eq:email}});
    if(user){
        return res.status(400).json({message:"user already exists"});
    }
    return res.status(200).json({message : "Email is available"});
}

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials. User not Found" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    return res.status(200).json({ message: "User authenticated", user: userResponse});

  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
