import { Request, Response, NextFunction } from 'express';

import { TokenService } from '../services';

function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
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
}

export default authenticateUser;
