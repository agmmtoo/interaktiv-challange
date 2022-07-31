import mongoose from 'mongoose';

// blank field validation is handled by controller

const InvoiceSchema = new mongoose.Schema({
    date: Date,
    customer: String,
    salesperson: String,
    notes: String,
    products: [Number],
    // automically populate timestamp values
}, { timestamps: true });

export default mongoose.model('Invoice', InvoiceSchema);