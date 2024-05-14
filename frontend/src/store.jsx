import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; // Import combineReducers from 'redux' instead of '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'; // Import thunk middleware separately
import logger from 'redux-logger'
import { productListReducer } from './reducers/productReducers'

const initialState = {};

const rootReducer = combineReducers({
    productlist: productListReducer,
});

const middleware = [thunk]

const store = configureStore({
  reducer: rootReducer,
  middleware: () => middleware,
  preloadedState: initialState,
});


// Output the initial state to the console
console.log(store.getState());

export { store };
