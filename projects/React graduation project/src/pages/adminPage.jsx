import React from 'react';

export const Admin = () => {
  const username = sessionStorage.getItem("username");
  return (
    <div>
      <h2>Hello {username}</h2>
    </div>
  );
};

export default Admin;
