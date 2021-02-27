import express from 'express';
import Joi from 'joi';

import { Consultation } from '../db/models';
import { schemaValidator } from '../middlewares';

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

router.get('/', async (req, res, next) => {
  try {
    const consultations = await Consultation.findAll({
      where: { clinicId: req.authenticatedUser?.id },
    });

    // TODO: pagination

    res.send({ data: consultations });
  } catch (err) {
    next(err);
  }
});

router.get('/:consultationId', async (req, res, next) => {
  try {
    const { consultationId } = req.params;
    const consultation = await Consultation.findOne({
      where: {
        id: consultationId,
        clinicId: req.authenticatedUser?.id,
      },
    });

    res.send({ data: consultation });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  schemaValidator(schemaCreateConsultation),
  async (req, res, next) => {
    try {
      const result = await Consultation.create({
        ...req.body,
        clinicId: req.authenticatedUser?.id,
      });

      res.status(201).send({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
