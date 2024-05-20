import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid } from '@mui/material';

 const Customers = () => {
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
    <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" style={{ color: '#87cefa', fontFamily: 'cursive', fontWeight: 'bold', margin: '10px' }}>
            Customers
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        
      </Grid>
    </Container>
  );
};

export default Customers;
