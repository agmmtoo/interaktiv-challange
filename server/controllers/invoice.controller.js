// import model
import Invoice from '../models/invoice.model.js';

async function list(req, res) {
    try {
        // requrest quries
        let { start = new Date(0), end = new Date(), limit = 10, page = 1 } = req.query;
        const list = await Invoice
            .find()
            // sort by date
            .sort({ date: -1 })
            // filter by date
            .where('date')
            .gt(start)
            .lt(end)
            // handle pagination at database level to optimize performance
            .skip(page > 0 ? limit * (page - 1) : 0)
            .limit(limit)

        // can't find an ideal way to determine total pages based on selected limit
        const count = await Invoice
            .find()
            // sort by date
            .sort({ date: -1 })
            // filter by date
            .where('date')
            .gt(start)
            .lt(end)
            .count();

        return res.status(200).json({ list, count: list.length, page, total_pages: Math.ceil(count / limit) });
    } catch (err) {
        return res.status(400).json({ message: `Error getting invoices: ${err}` });
    }
}

async function create(req, res) {
    try {
        // get only required fields
        const { date, customer, salesperson, notes = '', products } = req.body;
        // handle blank fields
        if (!customer || !salesperson || !products) return res.status(400).json({ message: 'Missing required fields' });
        // create new invoice
        const newInvoice = await Invoice.create({ date, customer, salesperson, notes, products });
        // save invoice to database
        await newInvoice.save();
        // return new invoice
        return res.status(201).json({ message: 'Invoice created', invoice: newInvoice });
    } catch (err) {
        return res.status(400).json({ message: `Error creating invoice: ${err}` });
    }
}

async function invoiceById(req, res, next, invoiceId) {
    try {
        const invoice = await Invoice.findById(invoiceId);
        // if result is null, then invoice not found
        if (!invoice) return res.status(404).json({ message: 'Empty invoice' });
        // if invoice found, then add it to request object
        req.invoice = invoice;
        // call next middleware
        next();
    } catch (err) {
        return res.status(400).json({ message: `Invoice not found` });
    }
}

async function read(req, res) {
    try {
        // get invoice from request object
        const invoice = req.invoice;
        // if invoice is impty, then invoice not found
        if (!invoice) return res.status(404).json({ message: 'Attached invoice not found' });
        // if invoice found, then return it
        return res.status(200).json(invoice);
    } catch (err) {
        return res.status(400).json({ message: `Error reading invoice: ${err}` });
    }
}

async function update(req, res) {
    try {
        // get updated fields
        const { date, customer, salesperson, notes = '', products } = req.body;
        // handle blank fields
        if (!customer || !salesperson || !products) return res.status(400).json({ message: 'Missing required fields' });
        // get invoice from request object
        const invoice = req.invoice;
        // update invoice
        // NOTICE: this needs client side to be sure of repopulating old data, which is not the best way to update a document
        invoice.date = date;
        invoice.customer = customer;
        invoice.salesperson = salesperson;
        invoice.notes = notes;
        invoice.products = products;

        await invoice.save();
        return res.status(202).json({ message: 'Invoice updated', invoice });
    } catch (err) {
        return res.status(400).json({ message: `Error updating invoice: ${err}` });
    }
}

async function destroy(req, res) {
    try {
        // get invoice from request object
        const invoice = req.invoice;
        // delete invoice
        await invoice.remove();
        return res.status(202).json({ message: 'Invoice deleted', invoice });
    } catch (err) {
        return res.status(400).json({ message: `Error deleting invoice: ${err}` });
    }
}

export default { list, create, invoiceById, read, update, destroy };