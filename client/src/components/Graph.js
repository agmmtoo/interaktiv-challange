import { useSelector } from 'react-redux';
import { selectInvoice } from '../features/invoice/invoiceSlice';
import { selectProduct } from '../features/product/productSlice';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Invoice Line Chart',
        },
    },
};

export default function Graph() {

    const products = useSelector(selectProduct);
    const invoices = useSelector(selectInvoice);

    const data = {
        labels: invoices.map(invoice => `${new Date(invoice.createdAt).getDate()}/${new Date(invoice.createdAt).getMonth()} ${new Date(invoice.createdAt).getMinutes()}:${new Date(invoice.createdAt).getHours()}`),
        datasets: [
            {
                label: 'Sales per Day',
                data: invoices.map((invoice) => Object.keys(invoice.products).reduce((total, id) => total + products.find(p => p.id == id).price * invoice.products[id], 0)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Predicted Sales',
                data: invoices.map((invoice, i) => i * 10),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className='w-full bg-green-400 h-[40vh]'>
            <Line options={options} data={data} width={50} height={50} />;
        </div>
    );
}