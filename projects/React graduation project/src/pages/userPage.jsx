import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ListProducts from '../components/users/listProducts';
import MyAccount from '../components/users/myAccount';
import MyOrders from '../components/users/myOrders';
import LogOut from '../components/users/LogOut';
import {Typography} from '@mui/material';


export const User = () => {
  const userString = sessionStorage.getItem("data");
  const user = JSON.parse(userString);
  const username = user.username;
  const [selectedComponent, setSelectedComponent] = useState("Products");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Products":
        return <ListProducts/>;
      case "My Orders":
        return <MyOrders/>
      case "My Account":
        return <MyAccount/>;
      case "Log Out":
        return <LogOut/>
      default:
        return null;
    }
  };
  return (
    <div>
      <Typography variant="h4" align="center"  style={{ color: '#2196f3', fontFamily: 'cursive', fontWeight: 'bold' ,margin: '10px'}}>
        Hello {username}
      </Typography>
      <Navbar
        data={["Products", "My Orders", "My Account", "Log Out"]}
        onSelect={setSelectedComponent}
        defaultSelected={selectedComponent}
      />
      {renderComponent()}
    </div>
  )
}
export default User
