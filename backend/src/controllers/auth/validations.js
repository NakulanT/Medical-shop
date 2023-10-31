import Joi from 'joi';

const Joi = require('joi');

const registrationSchema = Joi.object({
  username : Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phno: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export { registrationSchema, loginSchema };
