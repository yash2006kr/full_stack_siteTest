import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await axios.post('https://full-stack-sitetest-backend.onrender.com/api/auth/register', formData);
      setMessage({ text: response.data.message, type: 'success' });
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Registration failed', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // This uses the same OAuth entrypoint as Login.
    // The backend will create the user if they don't exist and return a JWT.
    window.location.href = 'https://full-stack-sitetest-backend.onrender.com/api/auth/google';
  };

  return (
    <div className={`form-container ${isLoading ? 'loading' : ''}`}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength="2"
          />
        </div>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading && <span className="loading"></span>}
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <button onClick={handleGoogleRegister} className="google-login-btn">
        Continue with Google
      </button>
      {message && (
        <div className={`message ${message.type}`} role="alert">
          {message.text}
        </div>
      )}
      <Link to="/login" className="link">Already have an account? Login</Link>
    </div>
  );
};

export default Register;
