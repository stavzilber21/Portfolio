import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { cartsActions } from '../../redux/cartsSlice';

export const PurProducts = ({product}) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const orders = useSelector((state) => state.orders.orders);
    // const carts = useSelector((state) => state.carts.carts);
    const [bought, setBought] = useState([]);
    const [number, setNumber] = useState(0);
    useEffect(() => {
        const usersFilter = users.filter((user)=>user.allowOrders===true).map((user)=>user.id);
        const userOrders = orders.filter((order) =>usersFilter.includes(order.userId));
        const ordersProducts = userOrders.flatMap((order) =>          
            order.products.filter((pro)=>pro.name===product.title).map((product) => ({
              name: product.name,
              qty: product.qty
            }))
       );
       const boughtQuantity = ordersProducts.reduce((total, product) => {
            total += product.qty;
        return total;
    }, 0);
    
    setBought(boughtQuantity);
       
      }, [orders,users,product]);

    //When press +
    const addToCart =()=>{
        if(number < product.inStock){
            setNumber(number + 1);
            dispatch(cartsActions.increase(
                {'id':product.id, 'title': product.title, 'price': product.price} 
             ))
        }
        else{
            setNumber(product.inStock)
        }
        
    }
    
    //When press -
    const subToCart =()=>{
        if(number > 0){
            setNumber(number - 1); 
            dispatch(cartsActions.decrease(
                {'id':product.id, 'title': product.title, 'price': product.price} 
            ))
        }
        else{
            setNumber(0);
        }
        
    }
      

  return (
    <div style={{ display: "flex", border: "pink 2px solid" }}>
        <div>
            <strong>{product.title}</strong><br/>
            {product.description}<br/>
            Price: {product.price}<br/>
            In Stock: {product.inStock}<br/>
            <button onClick={subToCart}>-</button>
            <div>{number}</div>
            <button onClick={addToCart}>+</button>
        </div>
        <div>
            <img width={'100px'} height={'100px'} src={product.image}></img>
        </div>
        <div>
            Bought: {bought}
        </div>
    </div>
  )
}
export default PurProducts
