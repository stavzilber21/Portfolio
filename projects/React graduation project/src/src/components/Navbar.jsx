import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';
import '../UI/Navbar.css';

export const Navbar = ({ data, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userString = sessionStorage.getItem("data");
  const user = JSON.parse(userString);
  const username = user.username;
  const logout = "Log Out";

  const handleClick = (component) => {
    onSelect(component);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <nav>
        <div className="links-container">
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
          <div className="profile">
            <Avatar
              alt="Profile"
              onClick={handleProfileClick}
              style={{ cursor: 'pointer' }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem >{username}</MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={`${logout.toLowerCase()}`} onClick={() => handleClick('Log Out')}>Log Out</Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
