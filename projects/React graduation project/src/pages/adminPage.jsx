import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/categories';
import Products from '../components/products';
import Customers from '../components/customers';
import Statistics from '../components/statistics';

export const Admin = () => {
  const username = sessionStorage.getItem("username");
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
      <h2>Hello {username}</h2>
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
