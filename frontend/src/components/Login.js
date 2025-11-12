import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');
    if (token) {
      localStorage.setItem('token', token);
      setMessage({ text: 'Login successful!', type: 'success' });
    } else if (error) {
      setMessage({ text: 'OAuth login failed', type: 'error' });
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await axios.post('https://full-stack-sitetest.onrender.com/api/auth/login', formData);
      setMessage({ text: response.data.message, type: 'success' });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Login failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://full-stack-sitetest.onrender.com/api/auth/google';
  };

  

  return (
    <div className={`form-container ${isLoading ? 'loading' : ''}`}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="identifier">Email or Username</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Enter your email or username"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading && <span className="loading"></span>}
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button onClick={handleGoogleLogin} className="google-login-btn">
        Login with Google
      </button>
      {message && (
        <div className={`message ${message.type}`} role="alert">
          {message.text}
        </div>
      )}
      <Link to="/register" className="link">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;
