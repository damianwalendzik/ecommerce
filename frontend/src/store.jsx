import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productsReducer } from './slices/productsSlice';
import { cartSliceReducer } from './slices/cartSlice';
import { userSliceReducer } from './slices/userSlice';



const store = configureStore({
  reducer: {
    products: productsReducer,
    detail: productDetailsReducer,
    cartitems: cartSliceReducer,
    userinfo: userSliceReducer,
  },
});

export { store };
