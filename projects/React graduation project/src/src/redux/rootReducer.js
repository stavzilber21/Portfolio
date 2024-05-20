import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import categoriesReducer from './categoriesSlice'
import productsReducer from './productsSlice'
import ordersReducer from './ordersSlice'
import cartsReducer from './cartsSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    orders: ordersReducer,
    carts: cartsReducer
  }
})

export default store