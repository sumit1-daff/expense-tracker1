const express = require("express");
const userController = require("../controllers/user.js");
const {authenticatePassword} = require('../middlewares/authenticatePassword.js');
const {validatePassword} = require('../middlewares/validatePassword.js');
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const validateUpdate = require('../middlewares/validateUpdate.js');
router = express.Router();
router.post("/signup",userController.addUser);
router.post("/logout", userController.logout);
router.post("/login",userController.authenticateUser);
router.get('/user-details',authMiddleware,userController.getDetails);
router.post('/update-profile',authMiddleware,validateUpdate,userController.updateProfile);
router.get('/verify-email',userController.verifyEmail);
router.post('/change-password', authMiddleware,validatePassword,authenticatePassword,userController.changePassword);
router.get("/is_protected", authMiddleware, async (req, res) => {
    res.status(200).json({success  :true});
});
module.exports = router; 
