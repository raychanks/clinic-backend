import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { clinicRouter, consultationRouter } from './routers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.get('/', (req, res) => {
  res.send('ok');
});

app.use('/', clinicRouter);
app.use('/consultations', consultationRouter);

export default app;
