// src/redux/productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cart: [],
    loading: false,
    error: null,
    shippingAddress: [],
    paymentMethod: null,
    ItemsPrice: 0,
    ShippingPrice: 0,
    TaxPrice: 0,
    TotalPrice: 0,
};

export const PlaceOrder = createAsyncThunk(
    'order/PlaceOrder',
    async ({ input }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.post(
                'http://127.0.0.1:8000/api/orders/add/',
                { input },
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);



const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PlaceOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PlaceOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(PlaceOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



export const productsActions = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
