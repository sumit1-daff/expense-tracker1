const Joi = require('joi');


const LoginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
    }),
  });
const validateLogin = (req,res,next) => {
    const data = req.body;
  

  return LoginSchema.validate(data, { abortEarly: false });
};

export default validateLogin;
