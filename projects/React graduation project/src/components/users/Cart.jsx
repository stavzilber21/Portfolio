import { Box } from '@mui/material';
import React from 'react'
import {useSelector } from 'react-redux';
import CartItem from './CartItem';


export const Cart = () => {
    const carts = useSelector((state) => state.carts.products);
    
  return (
    <div>
        <h1>Cart</h1>
        {
        carts.map((cart)=>(
          <Box key={cart.id} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 8 }}>
            <CartItem cart={cart}/>
          </Box>
        ))
      }
      <strong></strong>
    </div>
  )
}
export default Cart
