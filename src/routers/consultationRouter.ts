import express from 'express';
import Joi from 'joi';

import { Consultation } from '../db/models';

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
    const consultations = await Consultation.findAll({
      where: { clinicId: req.authenticatedUser?.id },
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
  try {
    const { consultationId } = req.params;
    const consultation = await Consultation.findOne({
      where: {
        id: consultationId,
        clinicId: req.authenticatedUser?.id,
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
    // TODO: handle status 400, will return 401 currently
    const body = await schemaCreateConsultation.validateAsync(req.body, {
      abortEarly: false,
    });

    const result = await Consultation.create({
      ...body,
      clinicId: req.authenticatedUser?.id,
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
