import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://sljom89u8d.execute-api.us-east-1.amazonaws.com/dev/login', {
        username: username,
        password: password,
      });

      const authToken = response.data.token;

      // Store the token in local storage or a state management system
      localStorage.setItem('authToken', authToken);

      console.log('Login successful!');

      // Set authenticated to true (assuming you have setAuthenticated prop)
      setAuthenticated(true);

      // Redirect to /home
      history.push('/home');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login failure, show an error message, etc.
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '300px', padding: '50px', border: '1px solid #333', borderRadius: '8px', background: '#1e1e1e', color: 'white' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Suraksha One Admin Login</h2>
        <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #444', background: '#333', color: 'white' }}
        />

        <label style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #444', background: '#333', color: 'white' }}
        />

        <button
          onClick={handleLogin}
          style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
