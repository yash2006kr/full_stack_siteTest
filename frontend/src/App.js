import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<div>Welcome to the App! <a href="/login">Login</a> or <a href="/register">Register</a></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
