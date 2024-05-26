import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || [],
    paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || []
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
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem('paymentMethod', JSON.stringify(action.payload))

        }
    },
    extraReducers:(builder) => {}
})

export const { setShippingAddress, clearShippingAddress, savePaymentMethod } = shippingSlice.actions
export const shippingSliceReducer = shippingSlice.reducer