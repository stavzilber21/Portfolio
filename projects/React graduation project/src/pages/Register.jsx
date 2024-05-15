import React, { useState } from 'react';
import { add } from '../firebase/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Checkbox, Container, Grid, Box } from '@mui/material';
import MyTypography from '../components/Typography';

export const Register = () => {
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [username, setUserName] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [checked, setChecked] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const clearForm = () => { 
    setFirstName(""); 
    setLastName(""); 
    setUserName(""); 
    setPassword(""); 
    setChecked(false);
  }; 
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    const date = new Date().toLocaleDateString();
  
    const newUser = { 
      firstName: firstName, 
      lastName: lastName,
      username: username, 
      password: password, 
      allowOrders: checked, 
      role: "user", 
      date: date 
    };
    
    add("users", newUser); 
    clearForm(); 
    navigate('/user');
  }; 

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Container maxWidth="sm">
        <Box p={3} bgcolor="#fff" borderRadius={4}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <MyTypography title={"New User Registration"}/>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="firstName"
                      fullWidth
                      label="First Name"
                      value={firstName} 
                      variant="outlined"
                      onChange={(e) => { setFirstName(e.target.value); }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="lastName"
                      fullWidth
                      label="Last name"
                      value={lastName} 
                      variant="outlined"
                      onChange={(e) => { setLastName(e.target.value); }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="username"
                      fullWidth
                      label="User Name"
                      value={username} 
                      variant="outlined"
                      onChange={(e) => { setUserName(e.target.value); }} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="password"
                      fullWidth
                      label="Password"
                      type="password"
                      value={password} 
                      variant="outlined"
                      onChange={(e) => { setPassword(e.target.value); }} 
                    />
                  </Grid>
                  <Grid item xs={12}  sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'allow others to see my orders' }}
                    />
                    <Typography variant="body1">Allow others to see my orders</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Create
                    </Button>
                  </Grid>
                </Grid> 
              </form> 
            </Grid>
          </Grid>
        </Box>
        </Container>
      </Box>

  );
}

export default Register;
