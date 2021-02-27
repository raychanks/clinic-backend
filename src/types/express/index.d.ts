import { JWTPayload, Pagination } from '../';

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: JWTPayload;
      pagination?: Pagination;
    }
  }
}
