const joi = require('joi');
const userSignUpSchema = joi.object().keys({
    name : joi.string().min(3).max(20).required(),
    email : joi.string().email().required(),
    password : joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
    confirm_password : joi.ref("password"),
});

const validateSignup = (req, res , next)=>{
    const { error } = userSignUpSchema.validate(req.body);
    if(error){
        console.log("user details are not validated");
        res.status(403).send(error.details[0].message);
    }else{
        console.log("User validated at signup!!");
        next();
    }
}

module.exports = validateSignup(userSignUpSchema);