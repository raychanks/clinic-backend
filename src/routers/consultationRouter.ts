import express from 'express';

import { Consultation } from '../db/models';
import { schemaValidator } from '../middlewares';
import { ConsultationSchema } from '../schemas';

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
  schemaValidator(ConsultationSchema.schemaCreateConsultation),
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
