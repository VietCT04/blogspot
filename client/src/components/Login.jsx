import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      });

      setMessage(response.data);
      if (response.status == 200){
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred.');
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label>Username:</label>
            <input 
              type="text"
              placeholder='Username'
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className='input-group'>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </form>
        <div className='login-message'>{message}</div>
      </div>
    </div>
  );
};

export default Login;
