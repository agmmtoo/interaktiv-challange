import mongoose from 'mongoose';

// blank field validation is handled by controller

const InvoiceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    customer: String,
    salesperson: String,
    notes: String,
    products: { type: Map, of: String },
    // automically populate timestamp values
}, { timestamps: true });

export default mongoose.model('Invoice', InvoiceSchema);