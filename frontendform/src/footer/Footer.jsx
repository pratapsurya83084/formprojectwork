import React from 'react';
// import {Link} from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
const Footer = () => {
  const currentDate=new Date();
// const currentYear = currentDate.getFullYear();
// console.log(currentYear,currentDate);

  return (
    <footer className='mb-0 bg-gray-100'>
   
{/* logo and soial media icons */}
<div className="flex justify-center gap-0">
          <div className="flex flex-col  ">
            <div className=" xl:flex">
             
                <img
                  src="\logo.png"
                  alt="BISJHINTUS Logo"
                  className=" h-15 mt-5 "
                />
              
              
            </div>

           
         
          </div>
          </div>


          {/* hidden lg: */}
          {/* <div className="flex flex-col  justify-center"> */}
  <div className="flex flex-col md:flex-row justify-center r space-y-8 md:space-y-0 md:space-x-1 max-w-6xl w-full mx-auto p-10 ">
  {/* Contact info */}
  <div className="text-center md:text-left md:mb-4 mb-  text-lg font-semibold w-full md:w-1/3">
    <h1>M/s BISJHINTUS PRIVATE LIMITED</h1>
    <br />
    <h1>CIN: U80904TR2021PTC013885</h1>
    <br />
    <h1>ISO:9001:2015, Certificate Number: 21IQGQ82</h1>
    <br />
    <p className="mt-10">
      All Rights Reserved | Copyright © BISJHINTUS | {new Date().getFullYear()}
    </p>
  </div>

  {/* Startup logo */}
  <div className="flex justify-center items-center w-full md:w-1/3">
    <img
      src="/startupIndia_vowlink_logo.png"
      alt="Logo"
      className="h-32 mb-4 md:mb-0"
    />
  </div>

  {/* Address info */}
  <div className="text-lg w-full md:w-1/3 text-center md:text-right">
    <h1 className="text-cyan-500 mb-4 md:mb-10 text-xl">CONTACT</h1>
    <ul className="space-y-4">
      <li className="text-xl font-bold">Registered Office</li>
      <li>C/O Jhintu Baidya Adhikari,</li>
      <li>Ramakrishna Colony, Belonia,</li>
      <li>South Tripura, Tripura – 799155</li>
    </ul>

    <ul className="space-y-4 mt-10">
      <li className="text-xl font-bold">Corporate Office</li>
      <li>KUDCEMP Building, 2nd Floor,</li>
      <li>MCC Commercial Complex,</li>
      <li>Mallikatte, Kadri, Mangalore,</li>
      <li>Karnataka – 575002</li>
    </ul>

    <ul className="space-y-4 mt-10">
      <li>Ph: +91 9353383517</li>
      <li>Mail: adoreforgrowth@bisjhintus.com</li>
    </ul>
  </div>
</div>


      {/* </div> */}

    </footer>
  
  );
}

export default Footer;
