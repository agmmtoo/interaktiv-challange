import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    invoice: invoiceReducer,
  },
});
