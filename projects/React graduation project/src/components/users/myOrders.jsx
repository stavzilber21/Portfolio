import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useSelector } from 'react-redux';

export const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const userString = sessionStorage.getItem("data");
  const user = JSON.parse(userString);
  const [usersTable, setUsersTable] = useState([]);

  useEffect(() => {
    const userOrders = orders.filter((order) => order.userId === user.id);
    const productsBought = userOrders.flatMap((order) =>
        order.products.map((product) => ({
          Title: product.name,
          Qty: product.qty,
          Total: product.price,
          Date: order.date
        }))
   );
   setUsersTable(productsBought);
  }, [orders]);
  return (
    <div>
      <h2>Orders</h2>
      <Table
          titles={['Title', 'Qty','Total' ,'Date']}
          data={usersTable}
          />
    </div>
  )
}
export default MyOrders
