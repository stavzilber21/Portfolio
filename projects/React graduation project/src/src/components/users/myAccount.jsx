import React, { useState } from 'react';
import { update } from '../../firebase/firebaseFunctions';
import { Button, TextField, Typography, Container, Grid, FormControlLabel, Checkbox, Box } from '@mui/material';
import MyTypography from '../Typography';
import '../../UI/Style.css'; 

export const MyAccount = () => {
  const userString = sessionStorage.getItem("data");
  const initialUser = JSON.parse(userString);
  const [user, setUser] = useState(initialUser || {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    allowOrders: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      allowOrders: !!user.allowOrders
    };
    sessionStorage.setItem("data", JSON.stringify(updatedUser));
    update("users", user.id, updatedUser);
    alert("the changes save!")
  };

  return (
    <Box className="box">
      <Container maxWidth="sm">
        <Box p={3} bgcolor="#fff" borderRadius={4}>
          <MyTypography title={"Edit Your Details"}/> 
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User Name"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={user.allowOrders}
                      onChange={handleChange}
                      name="allowOrders"
                      color="primary"
                    />
                  }
                  label="Allow others to see my orders"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default MyAccount;
