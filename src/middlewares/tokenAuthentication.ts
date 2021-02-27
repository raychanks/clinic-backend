import { RequestHandler } from 'express';
import { UnauthorizedException } from '../errors';

import { TokenService } from '../services';

const tokenAuthentication: RequestHandler = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new UnauthorizedException('invalid_token'));
      return;
    }

    req.authenticatedUser = TokenService.verify(authorization);
    next();
  } catch (err) {
    next(err);
  }
};

export default tokenAuthentication;
