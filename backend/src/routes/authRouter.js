
const express = require('express');
const userController = require('../controllers/userControllers.js');
router = express.Router();
const authMiddleware = require('../middlewares/authUser.js')
router.post('/signup', userController.addUser);
router.post('/logout',userController.logout);
router.post('/login',userController.authenticateUser);

module.exports = router;