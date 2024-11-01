const Joi = require("joi");
const loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email",
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
      }),
  });

const validateLogin = async(req, res , next)=>{
    const {error} = loginSchema.validate(req.body, { abortEarly: false });
    let errors = {
        email: null,
        password: null,
      };
      if (error) {
        error.details.forEach((err) => {
          if (err.path.includes('email')) {
            errors.email = err.message;
          }
          if (err.path.includes('password')) {
            errors.password = err.message;
          }
        });
      }
    if(error){
        console.log("Validation failed");
        return res.status(401).json(errors);
    }
    next();
}

module.exports = validateLogin;