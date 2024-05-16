import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productsReducer } from './slices/productsSlice';
import { cartSliceReducer } from './slices/cartSlice';


const store = configureStore({
  reducer: {
    products: productsReducer,
    detail: productDetailsReducer,
    cartitems: cartSliceReducer,
  },
});

export { store };
