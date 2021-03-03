import express from 'express';

import { tokenAuthentication } from '../middlewares';

const router = express.Router();

router.get('/verify', tokenAuthentication, (req, res) => {
  res.send({ success: !!req.authenticatedUser });
});

export default router;
