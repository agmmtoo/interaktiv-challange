import { useState } from 'react';
import { Combobox } from '@headlessui/react';

// local hardcoded data
// import products from '../data/products.json';
// redux
import { useSelector } from 'react-redux';
import { selectProduct } from '../features/product/productSlice';

export default function NewInvoice() {
    const products = useSelector(selectProduct);

    // combobox
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
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

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ ...values, selectedProduct });
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
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                >
                    <div className='relative'>
                        <label>
                            <span className='text-sm uppercase text-slate-500'>Product</span>
                            <Combobox.Input
                                onChange={(e) => setQuery(e.target.value)}
                                displayValue={(product) => product.name}
                                className='w-full p-2 leading-none border border-slate-300 rounded'
                            />
                        </label>
                        <Combobox.Options className='absolute max-h-60 w-full overflow-y-scroll mt-2 shadow rounded'>
                            {filteredProducts.map((product) => (
                                <Combobox.Option
                                    key={product.id}
                                    value={product}
                                >
                                    {/* {product.name} */}

                                    <div className='flex gap-4 justify-between items-center bg-slate-200 border-slate-700 p-2 cursor-pointer'>
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
                        className='w-full p-2 leading-none border border-slate-300 rounded'
                    />
                </label>

                <button
                    type='submit'
                    className='w-full p-2 text-white bg-green-500 hover:bg-green-400 border border-green-600 rounded transition-colors uppercase font-medium'
                >
                    Submit
                </button>
            </form>
        </div>
    );
}