import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartsActions } from '../../redux/cartsSlice';
import { Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import '../../UI/Style.css'; 

export const PurProducts = ({ product }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);
  const cartsProducts = useSelector((state) => state.carts.products);
  const [bought, setBought] = useState(0);

  useEffect(() => {
    const usersFilter = users.filter((user) => user.allowOrders === true).map((user) => user.id);
    const userOrders = orders.filter((order) => usersFilter.includes(order.userId));
    const ordersProducts = userOrders.flatMap((order) =>
      order.products.filter((pro) => pro.name === product.title).map((product) => ({
        name: product.name,
        qty: product.qty
      }))
    );
    const boughtQuantity = ordersProducts.reduce((total, product) => {
      total += product.qty;
      return total;
    }, 0);

    setBought(boughtQuantity);

  }, [orders, users, product]);

  //When press +
  const addToCart = () => {
    if (qty < product.inStock) {
      dispatch(cartsActions.increase(
        { 'id': product.id, 'title': product.title, 'price': product.price }
      ))
    }
  }

  //When press -
  const subToCart = () => {
    if (qty > 0) {
      dispatch(cartsActions.decrease(
        { 'id': product.id, 'title': product.title, 'price': product.price }
      ))
    }
    else {
      return;
    }
  }

  let qty = 0;
  const idx = cartsProducts.findIndex((p) => p.id === product.id);
  if (idx !== -1) {
    qty = cartsProducts[idx].qty;
  }

  return (
    <Card className="product-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>{product.title}</Typography>
        <Typography variant="body1" gutterBottom>{product.description}</Typography>
        <Typography variant="body2" gutterBottom>Price: {product.price}</Typography>
        <Typography variant="body2" gutterBottom>In Stock: {product.inStock}</Typography>
        <CardActions>
          <IconButton onClick={subToCart}><RemoveIcon /></IconButton>
          <Typography variant="body1">{qty}</Typography>
          <IconButton onClick={addToCart}><AddIcon /></IconButton>
        </CardActions>
      </CardContent>
      <CardContent>
        <img width={'100px'} height={'100px'} src={product.image} alt={product.title} />
      </CardContent>
      <CardContent>
        <Typography variant="body2" gutterBottom>Bought: {bought}</Typography>
      </CardContent>
    </Card>
  )
}

export default PurProducts;
