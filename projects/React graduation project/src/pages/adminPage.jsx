import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/admin/categories';
import Products from '../components/admin/products';
import Customers from '../components/admin/customers';
import Statistics from '../components/admin/statistics';
import {Typography} from '@mui/material';

export const Admin = () => {
  const userString = sessionStorage.getItem("data");
  const user = JSON.parse(userString);
  const username = user.username;
  const [selectedComponent, setSelectedComponent] = useState("Categories");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Categories":
        return <Categories />;
      case "Products":
        return <Products />;
      case "Customers":
        return <Customers />;
      case "Statistics":
        return <Statistics />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center"  style={{ color: '#2196f3', fontFamily: 'cursive', fontWeight: 'bold'  ,margin: '10px'}}>
        Hello {username}
          </Typography>

      <Navbar
        data={["Categories", "Products", "Customers", "Statistics"]}
        onSelect={setSelectedComponent}
        defaultSelected={selectedComponent}
      />
      {renderComponent()}
    </div>
  );
};

export default Admin;
