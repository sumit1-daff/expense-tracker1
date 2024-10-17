
const express = require('express');
const userController = require('../controllers/userControllers.js');
router = express.Router();
// router.use((req,res,next)=>{
//     console.log("req");
//     next();
// })
router.post('/signup', userController.addUser);
router.post('/check-email',userController.checkIfExists);
router.post('/login',userController.authenticateUser);

module.exports = router;