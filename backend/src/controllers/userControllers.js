const model = require("../models/usersModel.js");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require('../services/user.services.js')
exports.addUser = async (req, res) => {
  const user = userService.createUser(req.body);
  res.json(user);
};

exports.checkIfExists = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "user already exists" });
  }
  return res.status(200).json({ message: "Email is available" });
};

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("hello");

  try {
    const user = await User.findOne({ email: { $eq: email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials. User not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    const options = {
      maxAge: 60 * 60 * 1000,
      httpOnly : true,
      secure : true,
    };
    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        message: "User authenticated",
        user: userResponse,
      });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};