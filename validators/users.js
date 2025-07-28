const Joi = require('joi');


const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(0).optional(),
  role: Joi.string().valid('user', 'admin').optional()
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


const updateUserSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  age: Joi.number().integer().min(0).optional(),
  role: Joi.string().valid('user', 'admin').optional()
});

module.exports = {
  signupSchema,
  loginSchema,
  updateUserSchema
};
