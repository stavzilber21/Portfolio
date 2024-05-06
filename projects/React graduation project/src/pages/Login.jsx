import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

      //check if the user is exist in the firebase
      const user = users.find((user)=> user.username===username);
      if(user){
        if(user.password===password){
          //check if the user is the admin / user
          sessionStorage.setItem("data", JSON.stringify(user));
          user.role==="admin"? navigate('/admin'): navigate('/user');
        }
        else{
          alert('Incorrect password. try again');
        }
      }
      else{
          alert('No such username exists');
      }
    };

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <h2>Next Generation E-Commerce</h2>
            <div>
            <label htmlFor="username">Username:</label><br />
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="password">Password:</label><br />
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Login</button><br />
            New user? <Link to='/register'>Register Page</Link>
        </form>
    </div>
  )
}
export default Login