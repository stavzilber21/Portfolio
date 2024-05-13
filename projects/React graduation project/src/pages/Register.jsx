import React, { useState } from 'react';
import { add } from '../firebase/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography,Checkbox, Container, Grid} from '@mui/material';



export const Register = () => {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [username, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [checked, setChecked] =useState(false); 

    const navigate = useNavigate();


    const handleChange=(e)=> {
        setChecked(e.target.checked);
    }
      
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
          date: date // Assign the formatted date to the 'date' property
        };
        
        // Add the user to firebase
        add("users", newUser); 
        clearForm(); 
        navigate('/user');
      }; 
      
  return (
  <Container maxWidth="sm">
    <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={{ color: '#2196f3', fontFamily: 'cursive', fontWeight: 'bold' }}>
            New User Registration
          </Typography>
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
                <Grid item xs={12}>
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
  </Container>
  )
}
export default Register
