const model = require("../models/usersModel.js");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.services.js");
exports.addUser = async (req, res) => {
  const user = userService.createUser(req.body);
  console.log(user);
  res.json(user);
};

exports.checkIfExists = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    console.log("user exists");
    return res.status(400).json({ message: "user already exists" });
  }
  console.log("free email");

  return res.status(200).json({ message: "Email is available" });
};

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({id : user._id, username : user.email}, process.env.JWT_SECRET,{
      expiresIn: '1h',
    })
    const options = {
      secure: false, // Use true in production
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    }
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    res.cookie("token",token,options);
    return res.status(200).json({
      message: "User authenticated",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.statuscookie("token",token,options)(500).json({ message: "Internal server error" });
  }
};
