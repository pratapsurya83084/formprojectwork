import { message } from "antd";
import React, { useState } from "react";
import {useNavigate}  from 'react-router-dom'
const CreatePassword = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [currentPassword, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    if (currentPassword !== passwordConfirmation) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const formData = {
      email,
      currentPassword,
      newPassword: passwordConfirmation,
    };

    // console.log(formData);

    const response = await fetch("/api/createnewadmin", {
      method: "POST",
      // body: JSON.stringify(formData),
      body:JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
       'Accept': 'application/json'
      },
    });

    const data = await response.json();
    if (data.update==true) {
      message.success('create a user With New Password')
      navigate('/login')
    }

    console.log(data.update);
    if (data.update==false) {
      message.error('incorrect Email')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="mb-4">
          <img src="\logo.png" alt="" />
        </div>
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-center text-3xl font-bold text--600">
          Create User  
        </h1>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">New Password</label>
          <input
            type="password"
            placeholder="New Password"
            value={currentPassword}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {/* Reset Password */}
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;
