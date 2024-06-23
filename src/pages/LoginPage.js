import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {


  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Save user info in localStorage
      setEmail('');
      setPassword('');
      setError('');
      navigate('/')
    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err.message);
      setError('Invalid email or password');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <FormTitle>Login</FormTitle>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Login</SubmitButton>
        <SignUpLink to="/SignUpPage">Don't have an account? Sign Up</SignUpLink>
      </LoginForm>
    </LoginContainer>
  );
};


const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 300px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
`;

const SignUpLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  color: #333;
`;

export default LoginPage;