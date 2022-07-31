import express from 'express';

// import controllers
import invoiceController from '../controllers/invoice.controller';

const router = express.Router();

// TODO: add authentication

// PATH: /api/v1/invoices

router.route('/')
    // get all invoices
    .get(invoiceController.list)
    // create new invoice
    .post(invoiceController.create);

// PATH: /api/v1/invoices/:invoiceId

// load invoice by id and attach it to request object
router.param('invoiceId', invoiceController.invoiceById);

router.route('/:invoiceId')
    // get invoice by id
    .get(invoiceController.read)
    // update invoice by id
    .put(invoiceController.update)
    // delete invoice by id
    .delete(invoiceController.destroy);

export default router;