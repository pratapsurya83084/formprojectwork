



import React, { useState ,useContext} from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import {Link}  from 'react-router-dom'
import {  message } from 'antd';
const Login = () => {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // login adminpassword=admin11 email=admin11
  const handleSubmit = async (e) => {

    e.preventDefault();
    setError('');


    const response=await fetch('api/login',{
  method:"post",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
},
  body:JSON.stringify(formData)
  
    })
   
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data=await response.json();
    // console.log(data);
     // Retrieve the token

    
  // navigate('/admin');

 console.log(data.Login);
 
 if (data.login===true) {
  localStorage.setItem("token",data.token);
  // setToken(data.token);
  message.success("successfull  Login")
  navigate('/admin')
 
 }else{
  message.error("failed login! Enter correct creadential")
  // not redirect to /admin page
 }


     if (data.errors ) {
      setError(data.errors)
     }else{
      
      console.log(data);
      
     }

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='mb-4'>
        <img src="logo.png" alt="" />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">{name}Login</h2>
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
          {error.name && <p className="text-red-500 text-center mb-4">{error.name[0]}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>

          {/* forgot button */}
          {/*  */}
        </form>
      </div>
    </div>
  );
};

export default Login;
