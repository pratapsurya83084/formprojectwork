import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import bcrypt from 'bcryptjs'; // bcrypt is not used in this example

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null); // Add userData state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
  //post  formdata
    // const response = await axios.post('/api/login', formData);
 
  

  

      const { email, password } = formData; // Destructure formData
      const user = await loginUser(email, password);
      if (user) {
        console.log("Login successful:", user);
        alert('loginsuccessfull')
        navigate('/admin')
        const data = await fetchUserData();
        setUserData(data);
        console.log("User data:", data);
        // You can navigate to another page here if needed
        // navigate('/some-route');
      }
    } catch (err) {
      
      setError('Login failed. Please try again.');
      console.error(err);

    }
  };

  // Function to handle user login
  const loginUser = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authToken', data.token); // Store the token
      return data.user;
    } else {
      throw new Error('Login failed');
    }
  };

 // Function to fetch user data
  const fetchUserData = async () => {
    const token = localStorage.getItem('authToken');

    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the header
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
