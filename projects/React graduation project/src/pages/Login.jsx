import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      
      if (!username || !password) {
        alert('Please fill in both fields.');
        return;
      }
  
      console.log(username,password)
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