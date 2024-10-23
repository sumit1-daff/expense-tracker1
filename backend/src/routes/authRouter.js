const express = require("express");
const userController = require("../controllers/userControllers.js");
const { userSignUpSchema } = require('../validations/userSignUp.js');
const { validateSignup } = require('../middlewares/validateSignup.js');
router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware.js");
router.post("/signup",userController.addUser);
router.post("/logout", userController.logout);
router.post("/login",userController.authenticateUser);
router.get('/user-details',userController.getDetails);
router.post('/change-password', authMiddleware, userController.changePassword);
router.get("/is_protected", authMiddleware, async (req, res) => {
    res.status(200).json({success  :true});
});
module.exports = router; 
