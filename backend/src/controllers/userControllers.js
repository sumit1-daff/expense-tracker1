const model = require("../models/usersModel.js");
const User = model.User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.services.js");
exports.addUser = async (req, res) => {
  const emailExists = await userService.checkEmail(req.body);
  if(emailExists){
    return res.status(400).json({message : "User with Email already exists"});
  }
  else{
    const user = await userService.createUser(req.body);
    return res.status(200).json({user, "message": "user created successfully"});
  }
};

exports.logout = async (req, res)=>{
    res.clearCookie("authToken",{
      httpOnly: false,
      secure : false,
    });
    res.status(200).json({message : "logged out !!"});
  }


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
        expiresIn: "1h",
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
