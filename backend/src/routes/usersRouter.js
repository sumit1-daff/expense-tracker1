
const express = require('express');
const userController = require('../controllers/userControllers.js');
router = express.Router();
router.use((req,res,next)=>{
    console.log("req");
    next()
    
})
router.post('/signup', userController.addUser);
router.post('/check-email',userController.checkIfExists);
router.post('/authenticate-user',userController.authenticateUser);

export default router;