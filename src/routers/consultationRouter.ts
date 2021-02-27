import express from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import { Clinic, Consultation } from '../db/models';

interface JWTPayload {
  id: string;
}

const tokenSecret: string = config.get('tokenSecret');

const schemaCreateConsultation = Joi.object({
  doctorName: Joi.string().required(),
  patientName: Joi.string().required(),
  diagnosis: Joi.string().required(),
  medication: Joi.string().required(),
  consultationFee: Joi.number().required(),
  consultedAt: Joi.date().required(),
  nextConsultationAt: Joi.date(),
});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send({
        success: false,
        message: 'unauthorized',
      });
      return;
    }

    // verify token
    const token = authorization.replace(/^Bearer /, '');
    const { id: clinicId } = jwt.verify(token, tokenSecret) as JWTPayload;
    const consultations = await Consultation.findAll({
      where: { clinicId },
    });

    // TODO: pagination

    res.send({
      data: consultations,
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      message: 'unauthorized',
    });
  }
});

router.get('/:consultationId', async (req, res) => {
  const { consultationId } = req.params;

  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send({
        success: false,
        message: 'unauthorized',
      });
      return;
    }

    // verify token
    const token = authorization.replace(/^Bearer /, '');
    const { id: clinicId } = jwt.verify(token, tokenSecret) as JWTPayload;
    const consultation = await Consultation.findOne({
      where: {
        id: consultationId,
        clinicId,
      },
    });

    res.send({
      data: consultation,
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      // message: 'unauthorized',
      message: err.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send({
        success: false,
        message: 'unauthorized',
      });
      return;
    }

    // verify token
    const token = authorization.replace(/^Bearer /, '');
    const { id: clinicId } = jwt.verify(token, tokenSecret) as JWTPayload;

    // TODO: handle status 400, will return 401 currently
    const body = await schemaCreateConsultation.validateAsync(req.body, {
      abortEarly: false,
    });

    const result = await Consultation.create({
      ...body,
      clinicId,
    });

    res.status(201).send({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      // message: 'unauthorized',
      message: err.message,
    });
  }
});

export default router;
