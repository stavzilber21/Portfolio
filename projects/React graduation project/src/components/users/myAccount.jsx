import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { update } from '../../firebase/firebaseFunctions';

export const MyAccount = () => {
  // Initialize user state with sessionStorage data
  const userString = sessionStorage.getItem("data");
  const initialUser = JSON.parse(userString);
  const [user, setUser] = useState(initialUser || {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    allowOrders: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      // Ensure allowOrders is boolean
      allowOrders: !!user.allowOrders
    };
    sessionStorage.setItem("data", JSON.stringify(updatedUser));
    update("users", user.id, updatedUser);
    alert("the changes save!")
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Your Details:</h2>
        <div className="Field">
          <label>First name:</label> <br />
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="Field">
          <label>Last name:</label> <br />
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="Field">
          <label>User Name:</label> <br />
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="Field">
          <label>Password:</label> <br />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="Field">
          <input
            name="allowOrders"
            type="checkbox"
            checked={user.allowOrders}
            onChange={handleChange}
          />
          <span>Allow others to see my orders</span>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default MyAccount;
