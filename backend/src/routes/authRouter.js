const express = require("express");
const userController = require("../controllers/userControllers.js");
const { userSignUpSchema } = require('../validations/userSignUp.js');
const { validateSignup } = require('../middlewares/validateSignup.js');
router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware.js");
router.post("/signup", userController.addUser);
router.post("/logout",validateSignup(userSignUpSchema), userController.logout);
router.post("/login", userController.authenticateUser);
router.get("/is_protected", authMiddleware, async (req, res) => {
    res.status(200).json({success  :true});
});
module.exports = router;
