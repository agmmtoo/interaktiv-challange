import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// api
import { getInvoiceList } from '../api/invoice-apis';

export default function Invoices() {
    const [list, setList] = useState([]);
    useEffect(() => {
        getInvoiceList({})
            .then(setList)
            .catch(console.log)
    }, [])
    return (
        <div className='w-full p-4 text-slate-900'>
            <h2 className='text-lg font-medium uppercase text-slate-500'>Invoice List</h2>
            <div className='flex flex-col gap-4 p-4'>
                {list?.list?.map((invoice) => (
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
                            $50,500
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}