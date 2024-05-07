import React from 'react'
import {useDispatch} from 'react-redux';
import { cartsActions } from '../../redux/cartsSlice';
export const CartItem = ({cart}) => {
    const dispatch = useDispatch();

    //When press +
    const addToCart =()=>{
        // if(number < product.inStock){
        //     setNumber(number + 1);
        //     dispatch(cartsActions.increase(
        //         {'id':product.id, 'title': product.title, 'price': product.price} 
        //      ))
        // }
        // else{
        //     setNumber(product.inStock)
        // }
        
    }
    
    //When press -
    const subToCart =()=>{
        // if(number > 0){
        //     setNumber(number - 1); 
        //     dispatch(cartsActions.decrease(
        //         {'id':product.id, 'title': product.title, 'price': product.price} 
        //     ))
        // }
        // else{
        //     setNumber(0);
        // }
        
    }
  return (
    <div>
        {cart.title} - <button onClick={subToCart}>-</button> {cart.qty} <button onClick={addToCart}>+</button> units - Total: {cart.price*cart.qty}
    </div>
  )
}

export default CartItem
