import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || [],
    loading: false,
    error: null,
}

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
        },
        clearShippingAddress: (state) => {
            state.shippingAddress = []
            localStorage.removeItem('shippingAddress')
        }
    },
    extraReducers:(builder) => {}
})

export const { setShippingAddress, clearShippingAddress } = shippingSlice.actions
export const shippingSliceReducer = shippingSlice.reducer