import config from 'config';
import jwt from 'jsonwebtoken';

import { JWTPayload } from '../types';

const tokenSecret: string = config.get('tokenSecret');

const create = (clinicId: number): string => {
  return jwt.sign({ id: clinicId }, tokenSecret, {
    expiresIn: '1d',
  });
};

const verify = (authorizationToken: string): JWTPayload => {
  const token = authorizationToken.replace(/^Bearer /, '');
  const payload = jwt.verify(token, tokenSecret) as JWTPayload;

  return payload;
};

export { create, verify };
