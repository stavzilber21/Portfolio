import React from 'react'
import {useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { add, update } from '../../firebase/firebaseFunctions';
import { cartsActions } from '../../redux/cartsSlice';
import '../../UI/Style.css'; 
import MyTypography from '../Typography';
import { Grid, Button, Card, CardContent } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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
    <Grid container spacing={2} alignItems="center">
      {/* Cart Title and Icon */}
      <Grid item container alignItems="center">
          <MyTypography title="Cart" />
          <ShoppingCartIcon style={{ marginLeft: 90 , color: '#afeeee'}} />
      </Grid>

      {/* Cart Products */}
      {carts.products.map((cart) => (
        <Grid item xs={12} key={cart.id}>
          <Card className="product-card">
            <CardContent>
              <CartItem cart={cart} />
            </CardContent>
          </Card>
        </Grid>
      ))}
      
      {/* Total Price */}
      <Grid item xs={12}>
        <MyTypography title={"Total: " + carts.totalPrice} />
      </Grid>
      {/* Order Button */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={makeOrder}>Order</Button>
      </Grid>
  </Grid>
  )
}
export default Cart
