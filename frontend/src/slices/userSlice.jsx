import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { config } = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const { data } = await axios.post(
                'http://127.0.0.1:8000/api/users/login/', 
                { 'username': email,'password': password }, 
                config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);


// Async thunk for user logout
export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/logout');
            localStorage.removeItem('userInfo');
            return null;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.userInfo = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;

console.log('userSliceActions', userSliceActions);
console.log('userSliceReducer', userSliceReducer);
