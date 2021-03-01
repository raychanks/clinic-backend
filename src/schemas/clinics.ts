import Joi from 'joi';

export const register = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
});

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
