import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// api
import { getInvoice } from '../api/invoice-apis';

// local hardcoded data
import products from '../data/products.json';

export default function Invoice() {
    const { invoiceId } = useParams();

    const [data, setData] = useState();
    useEffect(() => {
        getInvoice({ invoiceId })
            .then(setData)
            .catch(console.log)
    }, [invoiceId]);

    if (data) return (
        <div className='m-4 p-4 text-slate-800 rounded-lg shadow-md space-y-4'>
            <div className='flex justify-between items-center text-sm font-medium text-slate-500 uppercase'>
                <h4 className=''>{data._id}</h4>
                <time dateTime={data.date}>{new Date(data.date).toDateString()}</time>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between items-center'>
                <div>
                    <div className='text-xs font-medium text-slate-500 uppercase'>customer</div>
                    <div>{data.customer}</div>
                </div>
                <div className='text-right'>
                    <div className='text-xs font-medium text-slate-500 uppercase'>salesperson</div>
                    <div className=''>{data.salesperson}</div>
                </div>
            </div>
            <table className='border w-full bg-slate-100'>
                <thead>
                    <tr className='flex justify-between items-center text-xs font-medium text-slate-500 uppercase'>
                        <th>Product Name</th>
                        <th>Product Count</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data.products).map((product_key) => (
                        <tr key={product_key} className='flex justify-between items-center'>
                            <td>{products.find(product => product.id === Number(product_key))?.name}</td>
                            <td>x {data.products[product_key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <blockquote className='border-l-2 border-l-slate-500 p-4'>
                <div className='text-xs text-slate-500 font-medium uppercase'>notes</div>
                {data.notes}
            </blockquote>
        </div>
    );
}