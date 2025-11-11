import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      setMessage({ text: response.data.message, type: 'success' });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Login failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`form-container ${isLoading ? 'loading' : ''}`}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-describedby="email-error"
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
