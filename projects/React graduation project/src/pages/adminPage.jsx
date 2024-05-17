import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/admin/categories';
import Products from '../components/admin/products';
import Customers from '../components/admin/customers';
import Statistics from '../components/admin/statistics';
import MyTypography from '../components/Typography';
import '../UI/Style.css'; 


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
      {/* <MyTypography title={"Hello "+username}/> */}
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
