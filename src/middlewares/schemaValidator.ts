import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { ValidationException } from '../errors';

const schemaValidator = (validationSchema: Joi.ObjectSchema) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const body = await validationSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    req.body = body;
    next();
  } catch (err) {
    next(new ValidationException(err.message));
  }
};

export default schemaValidator;
