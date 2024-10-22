const express = require("express");
const userController = require("../controllers/userControllers.js");
router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware.js");
// const authSignup = require('../middlewares/authSignup.js');
router.post("/signup", userController.addUser);
router.post("/logout", userController.logout);
router.post("/login", userController.authenticateUser);
router.get("/is_protected", authMiddleware, async (req, res) => {
    res.status(200).json({success  :true});
});
module.exports = router;
