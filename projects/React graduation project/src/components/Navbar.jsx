import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Navbar = ({ data, onSelect, defaultSelected }) => {

  const handleClick = (component) => {
    onSelect(component);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
          <div className="links">
            {data.map((name) => (
              <Button
                key={name}
                color="inherit"
                component={Link}
                to={`${name.toLowerCase()}`}
                onClick={() => handleClick(name)}
              >
                {name}
              </Button>
            ))}
          </div>
   
      </Container>
    </AppBar>
  );
};

export default Navbar;
