import express from 'express';
import Joi from 'joi';

import { Clinic } from '../db/models';

const router = express.Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
});

router.post('/register', async (req, res) => {
  try {
    const body = await registerSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const existingClinic = await Clinic.findOne({
      where: { email: body.email },
    });

    if (existingClinic) {
      throw new Error('clinic exists');
    }

    const result = await Clinic.create(body);

    res.send(result);
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
});

router.post('/login', (req, res) => {
  res.send('/login');
});

export default router;
