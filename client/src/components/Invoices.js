import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectProduct } from '../features/product/productSlice';
import { fetchInvoiceListAsync, selectInvoice } from '../features/invoice/invoiceSlice';

export default function Invoices() {
    // get products from redux store
    const products = useSelector(selectProduct);

    const dispatch = useDispatch();
    // fetch products and put into redux store
    useEffect(() => {
        dispatch(fetchInvoiceListAsync({}));
    }, [dispatch]);

    const list = useSelector(selectInvoice);

    return (
        <div className='w-full p-4 text-slate-900'>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg font-medium uppercase text-slate-500'>Invoice List</h2>
                <Link to='/new' role='button' className='flex items-center bg-green-500 transition-colors border border-green-600 rounded hover:bg-green-400 p-2 text-sm font-medium text-white uppercase'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Invoice
                </Link>
            </div>
            <div className='flex flex-col gap-4 p-4'>
                {list?.map((invoice) => (
                    <Link
                        to={invoice._id}
                        key={invoice._id}
                        className='inline-flex'
                    >
                        <div className='grow inline-flex flex-col'>
                            <h3 className='font-medium'>{invoice.customer}</h3>
                            <div className='text-sm  uppercase text-slate-500'>{new Date(invoice.date).toDateString()}</div>
                        </div>
                        <div className='font-medium'>
                            {/* terriable way to calculate amount */}
                            ${Object.keys(invoice.products).reduce((total, id) => total + products.find(p => p.id == id).price * invoice.products[id], 0)}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}