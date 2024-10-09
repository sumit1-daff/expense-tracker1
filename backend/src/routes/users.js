
const express = require('express');
const userController = require('../controllers/users.js');
router = express.Router();
router.post('/signup', userController.addUser);
router.post('/check-email',userController.checkIfExists);
router.post('/authenticate-user',userController.authenticateUser);
exports.router = router;