// src/redux/productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
  detail: [],
};

// Define the async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchDetailProduct = createAsyncThunk(
    'products/fetchDetailProduct',
    async (productId) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
        console.log('fetchDetailProduct:',response.data)
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

const productDetailsSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDetailProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDetailProduct.fulfilled, (state, action) => {
          state.loading = false;
          console.log('action.payload', action.payload)
          state.detail = action.payload;
          console.log('State detail:', state.detail)

        })
        .addCase(fetchDetailProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });



export const productsActions = productsSlice.actions;
export const productsReducer = productsSlice.reducer;

export const productDetailsActions = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;



