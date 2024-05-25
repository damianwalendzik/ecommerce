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

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const { config } = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const { data } = await axios.post(
                'http://127.0.0.1:8000/api/users/register/', 
                { 'name': name, 'email': email,'password': password }, 
                config);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await axios.put(
                'http://127.0.0.1:8000/api/users/profile/update/',
                { name, email, password },
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem('userInfo')
            state.userInfo = null;
            state.loading = false;
            state.error = null;

        }
    },
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
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                localStorage.setItem('userInfo', JSON.stringify(action.payload));

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        }
    });

export const { logoutUser } = userSlice.actions;
export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;

console.log('userSliceActions', userSliceActions);
console.log('userSliceReducer', userSliceReducer);
