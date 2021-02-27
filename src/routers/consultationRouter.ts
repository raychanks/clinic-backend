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
    const clinic = await Clinic.findByPk(clinicId);

    if (!clinic) {
      res.status(404).send({
        success: false,
        message: 'clinic_not_found',
      });
      return;
    }

    // TODO: get related consultations

    res.send(clinic.id);
  } catch (err) {
    res.status(401).send({
      success: false,
      message: 'unauthorized',
    });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.send(`GET /consultations/${id}`);
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
      result,
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
