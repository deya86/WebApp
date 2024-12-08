import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  // State to store form values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(''); // State for login messages
  const navigate = useNavigate(); // Correct use of navigate

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:4000/api/user/login', {
        email: formData.email,
        password: formData.password,
      });

      // Display success message
      setMessage('Login Successful!');
      console.log('Server Response:', response.data);

      // Redirect to Home after login
      navigate('/');

      // Clear form after successful login
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      // Handle login errors
      if (error.response) {
        setMessage(error.response.data.message || 'Login Failed');
      } else {
        setMessage('Error connecting to the server');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      {/* Display login status message */}
      {message && <p className="login-message">{message}</p>}

      <p className="login-footer">
        Don't have an account? <Link to="/SignUp" className="sign-up-link">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
