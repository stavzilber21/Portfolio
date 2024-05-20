import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { cartsActions } from '../../redux/cartsSlice';
import { Typography, CardActions, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const CartItem = ({cart}) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        const availableInStock =()=>{
            const product = products.find((p)=>p.id===cart.id);
            if(cart.qty < product.inStock){
                setAvailable(true);
            }
            else{
                setAvailable(false);
            }
        }
       availableInStock()
      }, [cart]);

    
      //when press X
      const removeProductFromTheCart =()=>{
        dispatch(cartsActions.removeProduct(
            {'id':cart.id, 'price': cart.price, 'qty': cart.qty} 
        ))
      }

     //When press +
     const addToCart =()=>{
        if(available){
            dispatch(cartsActions.increase(
                {'id':cart.id, 'title': cart.title, 'price': cart.price} 
             ))
        }    
        else{
            return;
        }
    }
    
    //When press -
    const subToCart =()=>{
        if(cart.qty > 0){
            dispatch(cartsActions.decrease(
                {'id':cart.id, 'title': cart.title, 'price': cart.price} 
            ))
        }
        else{
            return;
        }     
    }

    
  return (
    <div>
    <Typography>{cart.title}</Typography>
    <CardActions>
      <IconButton onClick={subToCart}><RemoveIcon /></IconButton>
      <Typography variant="body1">{cart.qty}</Typography>
      <IconButton onClick={addToCart}><AddIcon /></IconButton>
    </CardActions>
    <Typography>Total: {cart.price * cart.qty}</Typography>
    <IconButton onClick={removeProductFromTheCart}><DeleteIcon /></IconButton>
  </div>
  )
}

export default CartItem
