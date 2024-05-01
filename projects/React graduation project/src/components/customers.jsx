import React, { useEffect, useState } from 'react';
import Table from './Table';
import { useSelector } from 'react-redux';

export const Customers = () => {
  const users = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);
  const [usersTable, setUsersTable] = useState([]);

  useEffect(() => {
    const filterUser = users.filter((user)=>user.role!=='admin');
    const formattedUsers = filterUser.map((user) => {
      const userOrders = orders.filter((order) => order.userId === user.id);
      const productsBought = userOrders.flatMap((order) =>
        order.products.map((product) => ({
          Product: product.name,
          Qty: product.qty,
          Date: order.date
        }))
      );

      return {
        'Full Name': user.firstName + ' ' + user.lastName,
        'Joined At': user.date,
        'Products Bought': productsBought
      };
    });

    setUsersTable(formattedUsers);
  }, [users, orders]);

  return (
    <div>
      <h1>Customers</h1>
      <Table
        titles={['Full Name', 'Joined At', 'Products Bought']}
        data={usersTable}
        renderCell={(rowData, title) => {
          if (title === 'Products Bought') {
            return (
              <Table
                titles={['Product', 'Qty', 'Date']}
                data={rowData['Products Bought']}
              />
            );
          }
          return rowData[title];
        }}
      />
    </div>
  );
};

export default Customers;
