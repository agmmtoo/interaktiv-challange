import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

export const invoiceSlice = createSlice({
    // prefix name
    name: 'invoice',
    // initial state of store
    initialState,
    reducers: {
        addInvoices: (state, action) => {
            state.list.concat(action.payload)
        },
        addInvoice: (state, action) => {
            state.list.push(action.payload)
        },
        removeInvoice: (state, action) => {
            state.filter((invoice) => invoice.id !== action.payload.id);
        }
    }
});

export const { addInvoices, addInvoice, removeInvoice } = invoiceSlice.actions;

export const selectInvoice = (state) => state.invoice.list;

export default invoiceSlice.reducer;