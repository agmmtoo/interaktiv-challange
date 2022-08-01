import { useState } from 'react';
import { Combobox } from '@headlessui/react';

// local hardcoded data
import products from '../data/products.json';

export default function NewInvoice() {

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

    const handleInputChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    return (
        <div className='w-full p-4 text-slate-900'>
            <h2 className='font-medium uppercase text-slate-500'>New Invoice</h2>
            <form className='flex flex-col gap-4 p-4 text-sm'>
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

                <Combobox
                    value={selectedProduct}
                    onChange={setSelectedProduct}
                >
                    <label>
                        <span className='text-sm uppercase text-slate-500'>Product</span>
                        <Combobox.Input
                            onChange={(e) => setQuery(e.target.value)}
                            displayValue={(product) => product.name}
                            className='w-full p-2 leading-none border border-slate-300 rounded'
                        />
                    </label>
                    <Combobox.Options className=''>
                        {filteredProducts.map((product) => (
                            <Combobox.Option
                                key={product.id}
                                value={product}
                            >
                                {/* {product.name} */}

                                <div className='flex justify-between items-center bg-green-300'>
                                    <div>{product.name}</div>
                                    <div>{product.price}</div>
                                    <div>{product.stock}</div>
                                    <img src={product.picture} alt={product.name} className='w-20' />
                                </div>
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox>
            </form>
        </div>
    );
}