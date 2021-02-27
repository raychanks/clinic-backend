import Joi from 'joi';

export const schemaRegister = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
});

export const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
