import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from "react-google-charts";
import {
  BarChart,
  Bar,
  LabelList,
  Cell,
  XAxis,
  YAxis,
} from "recharts";

export const Statistics = () => {
  const users = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);
  const [dataProducts, setDataProducts] = useState([]);
  const [selectUser, setSelectUser] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [myUser, setMyUser] = useState('');

  // Define an array of colors
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f0e", "#ff0000"];

  const chooseUser = (val) => {
    setMyUser(val)
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

  }, [orders, users]);

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
  }, [orders, users, selectUser, myUser]);

  const options = {
    title: "Total Sold Products",
    tooltip: {
      text: 'value'
    },
    pieSliceText: 'value'
  };

  return (
    <div>
      <div>
        <Chart
          chartType="PieChart"
          data={dataProducts}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <div>
        <h3>Products Quantity Per Customer</h3>
        Sort By Customer: <br /><br />
        <select onChange={e => chooseUser(e.target.value)}>
          <option value=''>Select Customer...</option>
          {users.filter(user => user.role !== 'admin').map((user) => (
            <option key={user.id} value={user.firstName + ' ' + user.lastName}>{user.firstName + ' ' + user.lastName}</option>
          ))}
        </select><br /><br /><br />
        {selectUser && userOrders.length > 0 && // Add check for userOrders
          <BarChart width={400} height={400} data={userOrders} barCategoryGap={10}>
            <Bar dataKey="qty">
              {/* Loop through data and assign a different fill color to each bar */}
              {userOrders.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList dataKey="qty" position="top" />
            </Bar>
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Qty', angle: -90, position: 'insideLeft', interval: 2 }} />
          </BarChart>
        }
      </div>
    </div>
  )
}
export default Statistics;
