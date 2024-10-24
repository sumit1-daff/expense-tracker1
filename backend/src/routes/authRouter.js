const express = require("express");
const userController = require("../controllers/userControllers.js");
const {authenticatePassword} = require('../middlewares/authenticatePassword.js');
const {validatePassword} = require('../middlewares/validatePassword.js');
const { authMiddleware } = require("../middlewares/authMiddleware.js");
router = express.Router();
router.post("/signup",userController.addUser);
router.post("/logout", userController.logout);
router.post("/login",userController.authenticateUser);
router.get('/user-details',userController.getDetails);
router.post('/change-password', authMiddleware,validatePassword,authenticatePassword,userController.changePassword);
router.get("/is_protected", authMiddleware, async (req, res) => {
    res.status(200).json({success  :true});
});
module.exports = router; 
