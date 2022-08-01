import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useNotifications } from 'reapop';
import { useNavigate } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectProduct } from '../features/product/productSlice';
import { fetchInvoiceListAsync } from '../features/invoice/invoiceSlice';

// api
import { createInvoice } from '../api/invoice-apis';

export default function NewInvoice() {
    // notification hook
    const { notify } = useNotifications();

    // navigate hook
    const navigate = useNavigate();

    // reduct hook
    const products = useSelector(selectProduct);

    // combobox
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [query, setQuery] = useState('');

    const filteredProducts =
        query === ''
            ? products
            : products.filter((product) => {
                return product.name.toLowerCase().includes(query.toLowerCase())
            });

    // controlled input
    const [values, setValues] = useState({
        customer: '',
        salesperson: '',
        // warning regarding date format
        // https://stackoverflow.com/questions/7372038/is-there-any-way-to-change-input-type-date-format
        // solution: use custom date picker
        date: new Date().toISOString(),
    });

    // handle form input changes
    const handleInputChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    // redux
    const dispatch = useDispatch();

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // convert selected products to server format
        // format: { product_id: product_count, ... }
        const products = selectedProducts.reduce((accu, product) => ({ ...accu, [product.id]: 1 }), {})
        // console.log({ ...values, products });
        createInvoice({ ...values, products })
            .then((res) => {
                notify({
                    title: 'Success',
                    message: res.message,
                    status: 'success',
                    dismissible: true,
                    dismissAfter: 3000,
                });
                // chain
                return res;
            })
            .then((res) => navigate(`../${res.invoice._id}`))
            // run redux action to update invoice list
            .then(() => dispatch(fetchInvoiceListAsync({})))
            .catch((err) => {
                notify({
                    title: 'Error',
                    message: err?.message || 'failed to create invoice',
                    status: 'error',
                    dismissible: true,
                    dismissAfter: 3000,
                });
            });
    }

    return (
        <div className='w-full p-4 text-slate-900'>
            <h2 className='font-medium uppercase text-slate-500'>New Invoice</h2>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 p-4 text-sm'
            >
                <label>
                    <span className='text-sm uppercase text-slate-500'>Customer Name</span>
                    <input
                        name='customer'
                        type='text'
                        required
                        value={values.customer}
                        onChange={handleInputChange}
                        className='w-full p-2 leading-none border border-slate-300 rounded' />
                </label>

                <Combobox
                    multiple
                    value={selectedProducts}
                    onChange={setSelectedProducts}
                >
                    <div className='relative'>
                        <label>
                            <span className='text-sm uppercase text-slate-500'>Product</span>
                            <Combobox.Input
                                onChange={(e) => setQuery(e.target.value)}
                                displayValue={(product) => product.name}
                                className='w-full p-2 leading-none border border-slate-300 rounded'
                            />
                            {selectedProducts.length > 0 && (
                                <ul className='bg-slate-100 border-l-2 border-slate-400 p-2'>
                                    {selectedProducts.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>)}
                        </label>
                        <Combobox.Options className='absolute max-h-60 w-full overflow-y-scroll mt-2 shadow rounded border border-slate-300'>
                            {filteredProducts.map((product) => (
                                <Combobox.Option
                                    key={product.id}
                                    value={product}
                                >
                                    <div className={`flex gap-4 justify-between items-center bg-slate-100 p-2 cursor-pointer ${selectedProducts.map(p => p.id).includes(product.id) ? ' bg-slate-200' : ''}`}>
                                        <div className='w-full space-y-2'>
                                            <div>{product.name}</div>
                                            <div className='flex items-center justify-between text-slate-500'>
                                                <div>$ {product.price}</div>
                                                <div>x {product.stock}</div>
                                            </div>
                                        </div>
                                        <img src={product.picture} alt={product.name} className='w-20 rounded' loading='lazy' />
                                    </div>
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </div>
                </Combobox>

                <label>
                    <span className='text-sm uppercase text-slate-500'>Salesperson Name</span>
                    <input
                        name='salesperson'
                        type='text'
                        required
                        value={values.salesperson}
                        onChange={handleInputChange}
                        className='w-full p-2 leading-none border border-slate-300 rounded'
                    />
                </label>

                <label>
                    <span className='text-sm uppercase text-slate-500'>Date</span>
                    <input
                        name='date'
                        type='date'
                        required
                        value={values.date}
                        onChange={handleInputChange}
                        className='w-full p-2 leading-none border border-slate-300 rounded'
                    />
                </label>

                <label>
                    <span className='text-sm uppercase text-slate-500'>Notes</span>
                    <textarea
                        name='notes'
                        rows='4'
                        onChange={handleInputChange}
                        className='w-full p-2 leading-none border border-slate-300 rounded'
                    />
                </label>

                <button
                    disabled={!selectedProducts.length}
                    type='submit'
                    className='w-full p-2 text-white bg-green-500 hover:bg-green-400 disabled:bg-slate-300 rounded transition-colors uppercase font-medium'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}