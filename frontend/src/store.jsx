import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productsReducer } from './slices/productsSlice';
import { cartSliceReducer } from './slices/cartSlice';
import { userSliceReducer } from './slices/userSlice';
import { shippingSliceReducer } from './slices/shippingSlice';



const store = configureStore({
  reducer: {
    products: productsReducer,
    detail: productDetailsReducer,
    cartitems: cartSliceReducer,
    userinfo: userSliceReducer,
    shipping: shippingSliceReducer,
  },
});

export { store };
