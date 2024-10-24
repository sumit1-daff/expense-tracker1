const validateUpdateDetails = require('../validations/updateProfile.js');
const validateUpdate = async (req, res , next) =>{
    const errors = validateUpdateDetails(req.body);
    if(errors.emailError || errors.nameError){
        return res.status(300).json(errors);
    }
    next();
}

module.exports = validateUpdate;