import React from 'react';
import { Link } from 'react-router-dom';
import '../UI/Navbar.css'

export const Navbar = ({ data, onSelect, defaultSelected }) => {
    
  const handleClick = (component) => {
    onSelect(component);
  };

  return (
    <div>
      <nav>
        <div className="links">
          {data.map((name) => (
            <Link
              key={name}
              to={`${name.toLowerCase()}`}
              onClick={() => handleClick(name)}
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;