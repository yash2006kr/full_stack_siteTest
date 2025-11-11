import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="light-ray"></div>
        <div className="light-ray"></div>
        <div className="shape2"></div>
        <div className="ripple"></div>
        <div className="ripple"></div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <div className="welcome-container">
              <h1>Welcome</h1>
              <p>Join us today and start your journey!</p>
              <div className="welcome-links">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
