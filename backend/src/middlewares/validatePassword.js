const validatePasswordChangeForm = require('../validations/changepassword.js');

exports.validatePassword = (req, res, next)=>{
     const errors = validatePasswordChangeForm(req.body);
     if(errors.confirmPasswordError ||errors.currentPasswordError || errors.newPasswordError){
        return res.status(403).json(errors);
     }
    next();
}