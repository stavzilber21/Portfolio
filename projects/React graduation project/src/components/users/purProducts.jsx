import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const PurProducts = ({product}) => {
    const users = useSelector((state) => state.users.users);
    const orders = useSelector((state) => state.orders.orders);
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
  return (
    <div style={{ display: "flex", border: "pink 2px solid" }}>
        <div>
            <strong>{product.title}</strong><br/>
            {product.description}<br/>
            Price: {product.price}<br/>
            In Stock: {product.inStock}<br/>
            <button onClick={() => number>0 ? setNumber(number - 1): 0}>-</button>
            <div>{number}</div>
            <button onClick={() => number<product.inStock ? setNumber(number + 1):product.inStock}>+</button>
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
