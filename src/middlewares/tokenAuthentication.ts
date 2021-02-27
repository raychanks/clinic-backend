import { RequestHandler } from 'express';

import { TokenService } from '../services';

const tokenAuthentication: RequestHandler = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send({
        success: false,
        message: 'unauthorized',
      });
      return;
    }

    req.authenticatedUser = TokenService.verify(authorization);
    next();
  } catch (err) {
    next(err);
  }
};

export default tokenAuthentication;
