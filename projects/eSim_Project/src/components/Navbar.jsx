import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="topnav">
        <li className="logo">eSIM</li>
        <li className="contact-button">
          <button onClick={() => alert("Contact...")}>Contact Us</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
