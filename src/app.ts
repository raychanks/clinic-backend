import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { authRouter, clinicRouter, consultationRouter } from './routers';
import { tokenAuthentication } from './middlewares';
import { errorHandler } from './errors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/', clinicRouter);
app.use('/auth', authRouter);
app.use('/consultations', tokenAuthentication, consultationRouter);

app.use(errorHandler);

export default app;
