import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, TextField, Typography, Container, Grid, Box } from '@mui/material';
import MyTypography from '../components/Typography';
import '../UI/Style.css'

export const Login = () => {
  const users = useSelector((state) => state.users.users);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }

    // Check if the user exists in the firebase
    const user = users.find((user) => user.username === username);
    if (user) {
      if (user.password === password) {
        // Check if the user is the admin / user
        sessionStorage.setItem('data', JSON.stringify(user));
        user.role === 'admin' ? navigate('/admin') : navigate('/user');
      } else {
        alert('Incorrect username or password. Please try again');
      }
    } else {
      alert('Incorrect username or password. Please try again');
    }
  };

  return (
    <Box className="box">
      <Container maxWidth="sm">
        <Box p={3} bgcolor="#fff" borderRadius={4}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <MyTypography title={"Next Generation E-Commerce"}/>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="username"
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center">
                      New user? <Link to="/register">Register Page</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
