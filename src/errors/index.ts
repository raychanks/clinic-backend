import { ErrorRequestHandler } from 'express';

import NotFoundException from './NotFoundException';
import UnauthorizedException from './UnauthorizedException';
import ValidationException from './ValidationException';
import UniquenessException from './UniquenessException';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(err.status).send({
    timestamp: new Date().getTime(),
    message: err.message,
  });
};

export {
  errorHandler,
  NotFoundException,
  UnauthorizedException,
  ValidationException,
  UniquenessException,
};
