import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [admin, setadmin] = useState([]);
  // const [email, setEmail] = useState('');
// console.log(admin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/registers"); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        // Assuming result is an array, find the user you want to compare
        const user = result.find(user => user.username === 'pratap' && user.email === 'pratap@gmail.com');
      // console.log(user);
      
        const  adminuser=  localStorage.setItem("userdetail",JSON.stringify(user));
           const getUseradmin=JSON.parse(localStorage.getItem("userdetail"))
       
          console.log(getUseradmin);
               
           setadmin(getUseradmin)
        // if (adminuser) {
        //   setUsername(adminuser.username);
        //   setEmail(adminuser.email);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-gray-100 shadow-lg pb-2'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center w-full'>
          <img
            className='h-20 p-2'
            src="\logo.png" 
            alt="Logo"
          />
        </div>

        {admin.username === "pratap" && admin.email === "pratap@gmail.com" ? (
          <div className='mr-4 mt-4 mb-2'>
            <Link to="/admin">
              <button className='bg-[#009bb5] px-4 py-2 rounded font-bold text-white'>Admin</button>
            </Link> 
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
