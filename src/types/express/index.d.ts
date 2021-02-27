import { JWTPayload } from '../';

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: JWTPayload;
    }
  }
}
