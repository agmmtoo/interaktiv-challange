import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, selectProduct } from '../features/product/productSlice';

import Graph from '../components/Graph';
import Invoices from '../components/Invoices';

export default function Home() {
    const products = useSelector(selectProduct);
    // console.log(products)
    const dispatch = useDispatch();
    // fetch products and put into redux store
    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    return (
        <>
            <Graph />
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2'>
                    <Invoices />
                </div>
                <div className='w-full md:w-1/2'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}