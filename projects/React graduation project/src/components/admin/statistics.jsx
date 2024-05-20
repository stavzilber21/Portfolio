import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';
import { scaleOrdinal } from 'd3-scale';
import * as d3Chromatic from 'd3-scale-chromatic';
import {
  BarChart, Bar, LabelList, Cell, XAxis, YAxis,
} from "recharts";
import { Typography, Grid, Container } from '@mui/material';
import MyTypography from '../Typography';

const Statistics = () => {
  const users = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);
  const [dataProducts, setDataProducts] = useState([]);
  const [selectUser, setSelectUser] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [myUser, setMyUser] = useState('');

  const chooseUser = (val) => {
    setMyUser(val);
    setSelectUser(true);
  }

  useEffect(() => {
    //-----------------For the first Graph----------
    const ordersProducts = orders.flatMap(order =>
      order.products.map(product => ({
        name: product.name,
        qty: product.qty
      }))
    );

    const groupOrders = ordersProducts.reduce((acc, product) => {
      acc[product.name] = (acc[product.name] || 0) + product.qty;
      return acc;
    }, {});

    const data = [
      ["Product", "Quantity"],
      ...Object.entries(groupOrders).map(([name, qty]) => [name, qty])
    ];

    setDataProducts(data);

  }, [orders]);

  useEffect(() => {
    //-----------------For the second Graph----------
    if (myUser) {
      const userData = users.find((user) => (user.firstName + ' ' + user.lastName) === myUser);
      if (userData) {
        const userOrders = orders.filter((order) => order.userId === userData.id);

        const productsBought = userOrders.flatMap((order) =>
          order.products.map((product) => ({
            name: product.name,
            qty: product.qty,
          }))
        );

        const groupOrders = productsBought.reduce((acc, product) => {
          acc[product.name] = (acc[product.name] || 0) + product.qty;
          return acc;
        }, {});

        const data = Object.entries(groupOrders).map(([name, qty]) => ({ name: name, qty: qty }));
        setUserOrders(data);
      }
    }
  }, [orders, users, myUser]);

  const options = {
    tooltip: {
      text: 'value'
    },
    pieSliceText: 'value',
    backgroundColor: '#f0f0f0'
  };

  const colorScale = scaleOrdinal(d3Chromatic.schemeCategory10);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={6} display={'flex'} mt={3}>
        <Grid item xs={6} >
          <MyTypography title={'Total Sold Products'} />
          <Chart 
            chartType="PieChart"
            data={dataProducts}
            options={options}
            width={"100%"}
            height={"400px"}
            m={5}
          />
        </Grid>
        <Grid item xs={6}>
          <MyTypography title={'Products Quantity Per Customer'} />
          <Typography>Sort By Customer:</Typography>
          <select onChange={e => chooseUser(e.target.value)}>
            <option value=''>Select Customer...</option>
            {users.filter(user => user.role !== 'admin').map((user) => (
              <option key={user.id} value={user.firstName + ' ' + user.lastName}>{user.firstName + ' ' + user.lastName}</option>
            ))}
          </select><br /><br /><br />
          {selectUser && userOrders.length > 0 && (
            <BarChart width={350} height={350} data={userOrders} barCategoryGap={10}>
              <Bar dataKey="qty">
                {userOrders.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorScale(index)} />
                ))}
                <LabelList dataKey="qty" position="top" />
              </Bar>
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Qty', angle: -90, position: 'insideLeft', interval: 2 }} />
            </BarChart>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Statistics;
