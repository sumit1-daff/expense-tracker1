const model = require('../models/users.js');
const User = model.User;
const {status} = require('express');
exports.addUser = (req,res)=>{
    const user = new User(req.body);
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

exports.authenticateUser = async (req, res) =>{
    const { email, password } = req.body; // Destructure email and password from the request body
    
    try {
        // Find the user by email
        const user = await User.findOne({ email: { $eq: email } });
        
        if (!user) {
            // If user is not found, return 401 Unauthorized
            return res.status(401).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            // If password does not match, return 401 Unauthorized
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // If everything is okay, return success response
        console.log("The user is authenticated with the email id:", email);
        console.log(user);
        return res.status(200).json({ message: "User authenticated", user });

    } catch (error) {
        // Log any errors and return a 500 Internal Server Error
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}