import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// api
import { getInvoiceList } from '../../api/invoice-apis';

const initialState = {
    list: [],
    page: 1,
    total_pages: 1,
};

export const fetchInvoiceListAsync = createAsyncThunk(
    'invoice/fetchInvoiceList',
    async (params) => {
        const response = await getInvoiceList(params);
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);

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
            state.list.shift(action.payload)
        },
        removeInvoice: (state, action) => {
            state.filter((invoice) => invoice.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoiceListAsync.fulfilled, (state, action) => {
                state.page = action.payload.page;
                // state.list = [...state.list, ...action.payload.list];
                // since it's without lazy loading, data is fetched all once, so replace previouse state
                state.list = action.payload.list;
                state.total_pages = action.payload.total_pages;
            })
    }
});

export const { addInvoices, addInvoice, removeInvoice } = invoiceSlice.actions;

export const selectInvoice = (state) => state.invoice.list;
export const selectPage = (state) => state.invoice.page;

export default invoiceSlice.reducer;