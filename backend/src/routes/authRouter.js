
const express = require('express');
const userController = require('../controllers/userControllers.js');
router = express.Router();
const authMiddleware = require('../middlewares/authUser.js')
router.post('/signup', userController.addUser);
router.post('/check-email',userController.checkIfExists);
router.post('/login',userController.authenticateUser);
router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the dashboard', user: req.user });
});

module.exports = router;