import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Form = () => {

 

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone_number: '',
        country: '',
        job: '',
        course_enroll_date: '',
        course: '',
        service:' '

    });

    // useEffect(() => {
    // // make user object
    // //objectuser
    // const userEmailAndPassword = {
    //     username: formData.username,
    //     email: formData.email, 
    // };
    // const user = localStorage.setItem('userEmailAndPassword',JSON.stringify(userEmailAndPassword));
   
    
    // },[]);

    // const adminEmail="pratap@gmail.com";
    // const adminUsername="pratapAdmin";

    const navigate = useNavigate();
 
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

 
    // onsubmit form
    const handleSubmit = async (event) => {
        event.preventDefault();
      
       try {
        const response = await fetch("/api/registers", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // body: JSON.stringify(formData),
            body:JSON.stringify(formData)
          });
          if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Your form has been submitted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redirect or update the UI as needed
                navigate('/submit/success');
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem submitting your form. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }



        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10 md:py-20 mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-5 sm:mb-20 md:mb-20 text-center">
                Your Success Story Starts With BISJHINTUS Group
            </h2>
            <form 
        //  action="{{ route('form.submit') }}"
          method="POST"
            onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#009bb5] p-8 rounded-lg shadow-md">
                {/* Your form fields */}
                <div className="mb-6">
                    <label htmlFor="course" className="block text-white font-bold mb-2">Your Desired Course / Training </label>
                    <input
                        id="course"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Course You Are Signing Up For"
                        value={formData.course}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="course_enroll_date" className="block text-white font-bold mb-2">Course Journey Begins With Us</label>
                    <input
                        id="course_enroll_date"
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded"
                        value={formData.course_enroll_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="username" className="block text-white font-bold mb-2">Your Full Name</label>
                    <input
                        id="username"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-white font-bold mb-2">Your Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="phone_number" className="block text-white font-bold mb-2">Your Phone Number</label>
                    <input
                        id="phone_number"
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Enter your phone number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        pattern="\d{10}"
                        inputMode="numeric"
                        title="Phone number must be 10 digits"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="country" className="block text-white font-bold mb-2">Your Country</label>
                    <input
                        id="country"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Enter your country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="job" className="block text-white font-bold mb-2">Your Job Role</label>
                    <input
                        id="job"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded"
                        placeholder="Enter your job role"
                        value={formData.job}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* your service */}
                <div className="mb-6">
        <label htmlFor="service" className="block text-white font-bold mb-2">
          Select Your Service
        </label>
        <select
          name="service" // Name should match the formData key
          id="service"
          required
          value={formData.service} // Bind the selected value to state
          onChange={handleChange} // Update state on change
          className="w-full p-2 border border-gray-300 rounded text-gray-700"
        >
          <option value="" className='text-gray-400'>Select a service</option>
          <option value="BuisnessToCustomer">Business to Customer</option>
          <option value="BuisnessToBuisness">Business to Business</option>
        </select>
      </div>


                <div className="text-center">
                    <button
                        type="submit"
                        className="w- text-xl bg-[#009bb5] border text-white shadow-xl font-bold py-3 px-10 rounded"
                    >
                        ACT NOW
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
