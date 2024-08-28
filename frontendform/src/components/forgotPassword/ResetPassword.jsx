import React, { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
    password_confirmation: "",
  });

  async function handleRegister(e) {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "post",
      // ,localStorage.getItem('token')
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
      //  action="{{route('password.update')}}"

        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-center text-3xl font-bold text-indigo-600">
          Reset your Password
        </h1>
        

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
