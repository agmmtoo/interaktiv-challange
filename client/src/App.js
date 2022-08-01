import { Routes, Route } from 'react-router-dom';
import NotificationsSystem, { atalhoTheme, useNotifications, setUpNotifications } from 'reapop';
// pages
import Home from './pages/Home';

// components
import Invoice from './components/Invoice';
import NewInvoice from './components/NewInvoice';
import InvoiceIndex from './components/InvoiceIndex';

export default function App() {
    const { notifications, dismissNotification } = useNotifications();
    setUpNotifications({
        defaultProps: {
            position: 'top-right',
            dismissible: true,
        }
    })
    return (
        <>
            <NotificationsSystem
                notifications={notifications}
                dismissNotification={(id) => dismissNotification(id)}
                theme={atalhoTheme}
            />
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route path=':invoiceId' element={<Invoice />} />
                    <Route path='new' element={<NewInvoice />} />
                    <Route index element={<InvoiceIndex />} />
                </Route>
            </Routes>
        </>
    );
}