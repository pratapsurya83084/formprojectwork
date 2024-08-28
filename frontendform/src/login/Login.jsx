// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import bcrypt from 'bcryptjs'; // bcrypt is not used in this example
// import {  message } from 'antd';
// import {Link} from 'react-router-dom'
// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [userData, setUserData] = useState(null); // Add userData state
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post("/api/login", formData);
   
     
//     const { email, password } = formData;
//     const user = await loginUser(email, password);

//     // console.log(user.login);  //if login true then navigate  /admin route
//     // console.log(response.data.token.plainTextToken);

//     const token= response.data.token.plainTextToken;
//     const setTokenToLocalstorage=localStorage.setItem('userStoken',token);
//     // if (user.login) {
//     if(setTokenToLocalstorage){
//       console.log("Login successful:", formData);
//       // alert("loginsuccessfull");

//       message.success('Login  successfully');

//       // sessionStorage.setItem("Adlogin", true);


//       localStorage.setItem("Adlogin", true);

//       navigate("/admin");
//       const data = await fetchUserData();
//       setUserData(data);
//       // console.log("User data:", data);
//     }else{
//       setError("Invalid email or password.");
//     }
//   };

//   // Function to handle user login
//   const loginUser = async (email, password) => {
//     try {
//       const response = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // console.log(data);
//         return data;
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Login failed");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       throw error;
//     }
//   };

//   // Function to fetch user data
//   const fetchUserData = async () => {
   

//     const response = await fetch("/api/getadmindetail", {
//       method: "GET",
//       headers: {
//         // Authorization: `Bearer ${token}`, // Include the token in the header
//         Accept: "application/json",
//       },
//     });

//     // if (response.ok) {
//     //   return response.json();
//     // } else {
//     //   throw new Error("Request failed");
//     // }
//   };

//   // update password
//   const handleUpdatePassword = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform password update logic here
//       const response = await axios.post("/api/update-password", {
//         email,
//         newPassword,
//       });
//       console.log("Password updated:", response.data);
//       setIsUpdating(false);
//       // Optionally redirect or show a success message
//     } catch (err) {
//       console.error(
//         "Password update failed:",
//         err.response?.data?.message || err.message
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//        <div className="mb-5">
//         <img src="logo.png" alt="" />
//        </div>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
//           Login
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-gray-700 font-medium mb-2"
//               htmlFor="email"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               value={formData.email}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               className="block text-gray-700 font-medium mb-2"
//               htmlFor="password"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={handleChange}
//               value={formData.password}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Login
//           </button>

//             <div className="flex justify-end mt-4 text-gray-600 cursor-pointer">
//           <Link to="/forgotPassword">
//           <button>forgot Password?</button>
//           </Link>  
//             </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState ,useContext} from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  { AppContext } from '../context/AppContext';
import {Link}  from 'react-router-dom'
const Login = () => {
  const { token,setToken} = useContext(AppContext); // Destructure the state and setState
// console.log(token);

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
  body:JSON.stringify(formData)

    })

    const data=await response.json();
    // console.log(data);
     // Retrieve the token

    
  // navigate('/admin');

 console.log(data.Login);
 
 if (data.login===true) {
  localStorage.setItem("token",data.token);
  setToken(data.token);
  alert("success Login")
  navigate('/admin')
 
 }else{
  alert("failed login Enter  incorrect creadential")
  // not redirect to /admin page
 }


     if (data.errors ) {
      setError(data.errors)
     }else{
      
      console.log(data);
      
     }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
          <div className='flex justify-end mt-4 cursor-pointer'>
          <Link to="/forgotpassword">
          <p>Forgot Password ?</p>
          </Link>  
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
