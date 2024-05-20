import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ListProducts from '../components/users/listProducts';
import MyAccount from '../components/users/myAccount';
import MyOrders from '../components/users/myOrders';
import LogOut from '../components/LogOut';
import '../UI/Style.css'; 
import MyTypography from '../components/Typography';


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
      {/* <MyTypography title={"Hello "+username}/> */}
      <Navbar
        data={["Products", "My Orders", "My Account"]}
        onSelect={setSelectedComponent}
        defaultSelected={selectedComponent}
      />
      {renderComponent()}
    </div>
  )
}
export default User
