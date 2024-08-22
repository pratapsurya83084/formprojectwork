import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // bcrypt is not used in this example

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
  // Make the API request
  // const response = await axios.get('/api/getadmindetail', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //   },
  // });


  // Print the data to the console
  // console.log('Admin detail:', response.data);

// loginpass-pratap@#83084 ,pratap@gmail.com
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
      
      setError('incorrect creadential . Please try again.');
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
      // Store the new token and user data in local storage
      localStorage.setItem('newUpdatedAuthToken', data.token); // Store the new token
      return data.user;
    } else {
      throw new Error('Login failed');
    }
  };
  


 // Function to fetch user data
 const fetchAdminDetails = async () => {
  // Get tokens from local storage
  const authToken = localStorage.getItem('authToken');
const newUpdatedToken = localStorage.getItem('newUpdatedAuthToken');

// Print the token to the console
console.log('New Updated Token:', newUpdatedToken);

  // Use newUpdatedAuthToken if it exists, otherwise fallback to authToken
  const token = newUpdatedToken || authToken;

  try {
    const response = await fetch('/api/getadmindetail', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Use the selected token for authorization
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Print the fetched data to the console
    } else {
      console.error('Failed to fetch admin details');
    }
  } catch (error) {
    console.error('Error fetching admin details:', error);
  }
};

// Call the function to fetch admin details
// fetchAdminDetails();






  // update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      // Perform password update logic here
      const response = await axios.post('/api/update-password', {
        email,
        newPassword,
      });
      console.log('Password updated:', response.data);
      setIsUpdating(false);
      // Optionally redirect or show a success message
    } catch (err) {
      console.error('Password update failed:', err.response?.data?.message || err.message);
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






// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
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
//     setError('');

//     try {
//       const { email, password } = formData;

//       // Send login request
//       const response = await axios.post('/api/login', { email, password });

//       // If login is successful
//       if (response.status === 200) {
//         const { token } = response.data;
//         localStorage.setItem('authToken', token); // Store the token in localStorage

//         alert('Login successful');
//         navigate('/admin'); // Redirect to /admin page
//       }
//     } catch (err) {
//       setError('Incorrect credentials. Please try again.');
//       console.error('Login failed:', err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
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
//             <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
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
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
