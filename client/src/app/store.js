import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoice/invoiceSlice';
import porductReducer from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    product: porductReducer,
  },
});
