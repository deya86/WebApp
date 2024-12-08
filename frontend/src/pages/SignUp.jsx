import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axios from "axios";

function SignUp() {
  // State to store form values
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // State for error/success messages
  const [message, setMessage] = useState('');

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
      const response = await axios.post('http://localhost:4000/api/user/signup', {
        name: formData.fullName,
        email: formData.email,
        number: formData.phoneNumber,
        password: formData.password,
      });

      // Success message
      setMessage('Registration Successful!');
      console.log('Server Response:', response.data);

      // Clear the form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
      });
    } catch (error) {
      // Handle errors
      if (error.response) {
        setMessage(error.response.data.message || 'Registration Failed');
      } else {
        setMessage('Error connecting to the server');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="sign-up-container">
      <h1 className="sign-up-title">Sign Up</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
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
        <button type="submit" className="sign-up-button">Sign Up</button>
      </form>

      {/* Display message */}
      {message && <p className="sign-up-message">{message}</p>}

      <p className="sign-up-footer">
        Already have an account? <Link to="/Login" className="sign-in-link">Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;
