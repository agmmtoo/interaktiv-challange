import { Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/Home';

// components
import Invoice from './components/Invoice';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />}>
                <Route path=':invoiceId' element={<Invoice />} />
            </Route>
        </Routes>
    );
}