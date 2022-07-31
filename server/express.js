import express, { urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors());

export default app;