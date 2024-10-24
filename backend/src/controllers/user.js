const model = require("../models/usersModel.js");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {checkEmail} = require("../services/users/checkEmail.js");
const {createUser} = require("../services/users/createUser.js");
const mongoose = require('mongoose');
exports.addUser = async (req, res) => {
  const emailExists = await checkEmail(req.body);
  if (emailExists) {
    return res.status(400).json({ message: "User with Email already exists" });
  } else {
    const user = await createUser(req.body);
    return res.status(200).json({ user, message: "user created successfully" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).json({ message: "logged out !!" });
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const options = {
      secure: true,
      httpOnly: true,
      maxAge: 3600000,
    };
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
    res.cookie("authToken", token, options);
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