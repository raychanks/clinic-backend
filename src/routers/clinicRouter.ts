import express from 'express';
import bcrypt from 'bcrypt';

import { Clinic } from '../db/models';
import { TokenService } from '../services';
import { schemaValidator } from '../middlewares';
import {
  NotFoundException,
  UnauthorizedException,
  UniquessException,
} from '../errors';
import { ClinicSchema } from '../schemas';

const router = express.Router();

router.post(
  '/register',
  schemaValidator(ClinicSchema.schemaRegister),
  async (req, res, next) => {
    try {
      const existingClinic = await Clinic.findOne({
        where: { email: req.body.email },
      });

      if (existingClinic) {
        next(new UniquessException('clinic_exists'));
        return;
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await Clinic.create({
        ...req.body,
        password: hashedPassword,
      });
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/login',
  schemaValidator(ClinicSchema.schemaLogin),
  async (req, res, next) => {
    try {
      const existingClinic = await Clinic.findOne({
        where: { email: req.body.email },
      });

      if (!existingClinic) {
        next(new NotFoundException('clinic_not_found'));
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        existingClinic.password,
      );

      if (!isPasswordValid) {
        next(new UnauthorizedException('invalid_credentials'));
        return;
      }

      res.send({
        success: true,
        token: TokenService.create(existingClinic.id),
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
