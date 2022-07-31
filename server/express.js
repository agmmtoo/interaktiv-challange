import express, { urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';

// import routes
import invoiceRouter from './routes/invoice.router.js';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors());

// routes
app.use('/api/v1/invoices', invoiceRouter);

export default app;