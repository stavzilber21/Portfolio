import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
  }

  const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        load(state,action){
            state.products = action.payload
        }
    }
  })

export const productsActions = productsSlice.actions; 
export default productsSlice.reducer;