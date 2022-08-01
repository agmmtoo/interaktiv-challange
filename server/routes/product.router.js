import express from 'express';

// import controllers
import productController from '../controllers/product.controller.js';

const router = express.Router();

// TODO: add authentication

// PATH: /api/v1/invoices

router.route('/')
    // get all invoices
    .get(productController);


export default router;