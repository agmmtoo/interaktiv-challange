import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// api
import { getProducts } from '../../api/product-apis';

const initialState = {
    productlist: [],
};

export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProduct',
    async () => {
        const response = await getProducts();
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.productlist = action.payload;
            });
    }
});

export const selectProduct = (state) => state.product.productlist;

export default productSlice.reducer;