import bodyParser from 'body-parser';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { clinicRouter, consultationRouter } from './routers';
import { tokenAuthentication } from './middlewares';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/', clinicRouter);
app.use('/consultations', tokenAuthentication, consultationRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(400).send(err.message);
};

app.use(errorHandler);

export default app;
