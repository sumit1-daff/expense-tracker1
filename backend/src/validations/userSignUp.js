const joi = require('joi');
const userSignUpSchema = joi.object().keys({
    name : joi.string().min(3).max(20).required(),
    email : joi.string().email().required(),
    password : joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
    confirm_password : joi.ref("password"),
});

module.exports = {
    userSignUpSchema
}