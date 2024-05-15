
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cartitems: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (productId, qty) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cart/${productId}?qty=${qty}`);
        console.log('fetchDetailProduct:',response.data)
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  const cartSlice = createSlice({
    name: 'cartitems',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existItem = state.cartitems.find(x => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartitems: state.cartitems.map(x =>
                        x.product === existItem.product ? item : x
                    )
                };
            } else {
                return {
                    ...state,
                    cartitems: [...state.cartitems, item]
                };
            }
        },
        removeFromCart(state, action) {
        },
        updateQuantity(state, action) {
        },
    }
});

export const cartSliceActions = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;