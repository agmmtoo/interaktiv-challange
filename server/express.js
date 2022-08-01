import express, { urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet'
import compression from 'compression'

// import routes
import invoiceRouter from './routes/invoice.router.js';
import productRouter from './routes/product.router.js';

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());

// routes
app.use('/api/v1/invoices', invoiceRouter);
app.use('/api/v1/products', productRouter);

export default app;
