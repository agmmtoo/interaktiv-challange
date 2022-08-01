import { Outlet } from 'react-router-dom';

import Graph from '../components/Graph';
import Invoices from '../components/Invoices';

export default function Home() {
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