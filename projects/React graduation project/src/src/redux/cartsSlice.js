import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [], totalPrice: 0
  }

  const cartsSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increase(state,action){
          const index = state.products.findIndex((p) => p.id === action.payload.id);
          if (index === -1) {
            state.products.push({
              id: action.payload.id,
              title: action.payload.title,
              qty: 1,
              price: action.payload.price,
            });
          } else {
            state.products[index].qty += 1;
          }
          state.totalPrice += action.payload.price;
        },


        decrease(state, action) {
          const index = state.products.findIndex((p) => p.id === action.payload.id);
          if (state.products[index].qty === 1) {
            state.products.splice(index, 1);
          } else {
            state.products[index].qty -= 1;
          }
          state.totalPrice -= action.payload.price;
        },


        clearCart(state, action){
          state.products = [];
          state.totalPrice = 0;
        },

        removeProduct(state, action){
          const index = state.products.findIndex((p) => p.id === action.payload.id);
          state.products.splice(index, 1);
          state.totalPrice -= (action.payload.price*action.payload.qty);
        }
    }
  })

export const cartsActions = cartsSlice.actions; 
export default cartsSlice.reducer;