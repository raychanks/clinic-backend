import express from 'express';
import config from 'config';
import { Op } from 'sequelize';

import { Consultation } from '../db/models';
import { pagination, schemaValidator } from '../middlewares';
import { ConsultationSchema } from '../schemas';
import { Pagination } from '../types';

const PAGE_SIZE: number = config.get('resources.consultation.pageSize');
const router = express.Router();

router.get('/', pagination(PAGE_SIZE), async (req, res, next) => {
  try {
    const { page, pageSize } = req.pagination as Pagination;
    const { from, to } = req.query as { from: string; to: string };
    const { rows: consultations, count } = await Consultation.findAndCountAll({
      where: {
        clinicId: req.authenticatedUser?.id,
        consultedAt: {
          [Op.gte]: from,
          [Op.lt]: to,
        },
      },
      limit: pageSize,
      offset: pageSize * (page - 1),
      order: [['consultedAt', 'DESC']],
    });
    const totalPages = Math.ceil(count / pageSize);

    res.send({
      data: consultations,
      totalPages,
      pageSize,
      page,
    });
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
