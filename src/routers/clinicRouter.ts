import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

import { Clinic } from '../db/models';

const tokenSecret: string = config.get('tokenSecret');

const router = express.Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
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
      throw new Error('clinic_exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await Clinic.create({
      ...body,
      password: hashedPassword,
    });
    res.send({ success: true });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const existingClinic = await Clinic.findOne({
      where: { email: body.email },
    });

    if (!existingClinic) {
      res.status(404).send({
        success: false,
        message: 'clinic_not_found',
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      existingClinic.password,
    );

    if (!isPasswordValid) {
      res.status(401).send({
        success: false,
        message: 'invalid_credentials',
      });
      return;
    }

    const token = jwt.sign({ id: existingClinic.id }, tokenSecret, {
      expiresIn: '1d',
    });

    res.send({
      success: true,
      token,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
});

export default router;
