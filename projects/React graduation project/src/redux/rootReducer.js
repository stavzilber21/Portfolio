import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import categoriesReducer from './categoriesSlice'
import productsReducer from './productsSlice'
import ordersReducer from './ordersSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    orders: ordersReducer
  }
})

export default store