
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    loading: false,
    error: null,
};
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ id, quantity }, { getState }) => {
      const state = getState().cartitems;

      const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

      const item = {
        product: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      };

    return item;
});

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async(id) => {

    return id
  }
)


const cartSlice = createSlice({
  name: 'cartitems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(addToCart.pending, (state) => {
          state.loading = true
          state.error = null

      }).addCase(addToCart.fulfilled, (state, action) => {
          state.loading = false
          const newItem = action.payload;
          const existItemIndex = state.cartItems.findIndex(x => x.product === newItem.product);
          if (existItemIndex !== -1) {
            state.cartItems[existItemIndex].quantity = newItem.quantity;
          } else {
            state.cartItems.push(newItem);
          }
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

      }).addCase(addToCart.rejected, (state, action) => {
          state.loading = false
          state.error = action.error.message
      }).addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
          state.loading = false;
          const removedItemId = action.payload;
          state.cartItems = state.cartItems.filter(item => item.product !== removedItemId);
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        })
      .addCase(removeFromCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
      });
  }

});
export const cartSliceActions = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;

console.log('cartSliceActions', cartSliceActions)
console.log('cartSliceReducer', cartSliceReducer)