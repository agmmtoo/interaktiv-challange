import { Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';

// components
import Invoice from './components/Invoice';
import NewInvoice from './components/NewInvoice';
import InvoiceIndex from './components/InvoiceIndex';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />}>
                <Route path=':invoiceId' element={<Invoice />} />
                <Route path='new' element={<NewInvoice />} />
                <Route index element={<InvoiceIndex />} />
            </Route>
        </Routes>
    );
}