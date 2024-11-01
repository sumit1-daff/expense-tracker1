const Joi = require("joi");

const signUpSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 4 characters",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: Joi.string()
    .required()
    .messages({
      "string.empty": "Confirm password is required",
    })
    .custom((value, helpers) => {
      if (!value) {
        return helpers.message("Confirm password is required");
      }
      if (value !== helpers.state.ancestors[0].password) {
        return helpers.message("Confirm password must match password");
      }
      return value;
    }),
});

const validateSignUp = (req, res, next) => {
  console.log("Inside the validate sign up function");
  const { error } = signUpSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  
  if (error){
    const errors = error.details.reduce((acc, err) => {
      const field = err.path[0];
      acc[field] = err.message;
      return acc;
    }, {});
    
    console.log(errors);
    return res.status(400).json({ message: "Validation Failed", errors });
  }

  next();
};

module.exports = validateSignUp;
