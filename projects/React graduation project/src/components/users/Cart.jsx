import { Box } from '@mui/material';
import React from 'react'
import {useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { add, update } from '../../firebase/firebaseFunctions';
import { cartsActions } from '../../redux/cartsSlice';


export const Cart = () => {
    const carts = useSelector((state) => state.carts);
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    const userString = sessionStorage.getItem("data");
    const user = JSON.parse(userString);
    const userId = user.id;
    
    const makeOrder = () => {
        const productsOrder = carts.products.map((cart) => ({ name: cart.title, price: cart.price, qty: cart.qty }));
        const date = new Date().toLocaleDateString();
        const newOrder = { date: date, userId: userId, products: productsOrder };
        add("orders", newOrder);
    
        // Update the stock of each product
        carts.products.forEach(prod => {
            const product = products.find((pro) => pro.id === prod.id);
            update("products", product.id, { ...product, inStock: product.inStock - prod.qty });
        });
    
        // Dispatch action to clear the cart after placing the order
        dispatch(cartsActions.clearCart());
    }
    

  return (
    <div>
        <h1>Cart</h1>
        {
        carts.products.map((cart)=>(
          <Box key={cart.id} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 8 }}>
            <CartItem cart={cart}/>
          </Box>
        ))
      }
      <br/>
      <br/>
      <strong>Total: {carts.totalPrice}</strong>
      <br/>
      <br/>
      <button onClick={makeOrder}>Order</button>
    </div>
  )
}
export default Cart
