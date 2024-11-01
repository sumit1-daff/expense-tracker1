const model = require("../models/usersModel.js");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
const generateAccessToken = require('../services/token/generateAccessToken.js');
const generateRefreshToken = require('../services/token/generateRefreshToken.js');
const {checkEmail} = require("../services/users/checkEmail.js");
const {createUser} = require("../services/users/createUser.js");
const mongoose = require('mongoose');


exports.addUser = async (req, res) => {
  try {
    const emailExists = await checkEmail(req.body);
    if (emailExists) {
      console.log("user already exits");
      return res.status(400).json({ message: "User with Email already exists" });
    }
    const user = await createUser(req.body);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,  
      auth: {
        user: 'sumit.test2409@gmail.com', 
        pass: process.env.APP_PASSWORD,
      }
    });

    const mailOptions = {
      from: 'sumit.test2409@gmail.com',
      to: user.email,
      subject: 'Verify your Email',
      text: `Click on the link to verify your mail: http://localhost:3000/auth/verify-email?token=${token} \n\nIf you didn't register, you can ignore this email.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({ message: "Verification link sent to your email" });
    });
    await user.save();
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(400).json({ message: "Error creating user" });
  }
};


exports.verifyEmail = async (req, res)=>{
    const token = req.query.token;
    try{
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
      console.log("user verified using mail");
      return res.status(200).json({message : "User verified"})
    }catch(error){
      console.error("Error occured", error);
      return res.status(500).json({message : "Internal server error occurred"});
    }
}

exports.logout = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
  });
  res.clearCookie("refreshToken",{
    httpOnly : true,
    secure : true,
  })
  res.status(200).json({ message: "logged out !!" });
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $eq: email } });
    // if (!user || user.isDeleted) {
    //   return res.status(401).json({ message: "Invalid credentials." });
    // }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    
    const options = {
      secure: true,
      httpOnly: true,
    };
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    const accesstoken =  await generateAccessToken(userResponse);
    const refreshToken = await  generateRefreshToken(userResponse);
    res.cookie("authToken", accesstoken, options)
    .cookie("refreshToken",refreshToken,options);
    return res.status(200).json({
      message: "User authenticated",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDetails = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.status(200).send(user);
  } catch (err) {
    return res.status(403).json({ message: "Invalid token. Please log in." });
  }
};

exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const user = req.user;
  const { _id } = user;
  try {
    const userData = await User.findById(_id);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate(userData, { password: hashPassword });
    return res.status(200).json({ message: "Succesfuly changed the password" });
  } catch (error) {
    console.error("Error occurred", error);
    return res.status(500).json({ message: "error occurred " });
  }
};

exports.updateProfile = async (req, res) =>{

  const { _id } = req.user;
 try{
  const id = new mongoose.Types.ObjectId(_id);
  const updatedUser = await User.findOneAndUpdate({_id : id},{... req.body},{new : true});
  if(!updatedUser){
    return res.status(404).json({message : "Update not succesfull"});
  }
  res.status(200).json({
    message : "Update Successfull",
    user : updatedUser
  });
 }catch(error){
  console.error("Error occurred",error);
 }

}

exports.deleteAccount = async (req, res) =>{
  const {_id} = req.user;
  try{
    const user = await User.findById(_id);
  if(!user){
    return res.status(404).json({message : "User not found"});
  }
  await User.findOneAndUpdate({_id},{status : false , isDeleted : true},{new :true});
  this.logout(req, res);
  return;
  }catch(err){
    console.error("Error occurred while deleting the account", err);
  }

}