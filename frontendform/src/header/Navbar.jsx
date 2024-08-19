import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
 

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

        
          <div className='mr-4 mt-4 mb-2'>
            <Link to="/login">
              <button className='bg-[#009bb5] px-4 py-2 rounded font-bold text-white'>Login</button>
            </Link> 
          </div>

      </div>
    </div>
  );
}

export default Navbar;
