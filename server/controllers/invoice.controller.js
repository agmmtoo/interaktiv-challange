async function list(req, res) {
    try {
        const list = [{
            id: 1,
            date: new Date(2019),
            customer: 'John Doe',
            salesperson: 'Jane Doe',
            notes: 'Some notes',
            products: [
                { id: 100, quantity: 10 },
                { id: 101, quantity: 20 },
            ],
        }];

        return res.status(200).json(list);
    } catch (err) {
        return res(400).json({ message: `Error getting invoices: ${err}` });
    }
}

async function create(req, res) {
    try {
        // get only required fields
        const { date, customer, salesperson, notes = '', products } = req.body;

        const newInvoice = {};
        return res.status(201).json({ message: 'Invoice created', invoice: newInvoice });
    } catch (err) {
        return res(400).json({ message: `Error creating invoice: ${err}` });
    }
}

async function invoiceById(req, res, next, invoiceId) {
    try {
        const invoice = {};
        // if result is null, then invoice not found
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        // if invoice found, then add it to request object
        req.invoice = invoice;
        // call next middleware
        next();
    } catch (err) {
        return res.status(400).json({ message: `Error attaching invoice: ${err}` });
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
        // get invoice from request object
        const invoice = req.invoice;
        return res.status(202).json({ message: 'Invoice updated', invoice });
    } catch (err) {
        return res.status(400).json({ message: `Error updating invoice: ${err}` });
    }
}

async function destroy(req, res) {
    try {
        // get invoice from request object
        const invoice = req.invoice;
        return res.status(202).json({ message: 'Invoice deleted', invoice });
    } catch (err) {
        return res.status(400).json({ message: `Error deleting invoice: ${err}` });
    }
}

export default { list, create, invoiceById, read, update, destroy };