// import React, { useState } from 'react';
// import axios from 'axios';

// function ForgotPassword() {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//           const response = await axios.post('/api/forgot-password', {
//               email: email,  // Ensure 'email' is the correct value here
//           });
//         //   console.log(response.data);
//       } catch (error) {
//           console.error(error.response?.data || error.message);
//       }
//   };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
//                 <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
//                 <form
//                 // add route 
//                 // action="{{route('password.request')}}"

//                 onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             required
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         disabled={loading}
//                     >
//                         {loading ? 'Sending...' : 'Send Password Reset Link'}
//                     </button>
//                 </form>
//                 {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
//             </div>
//         </div>
//     );
// }

// export default ForgotPassword;



import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const email = event.target.email.value;

            try {
                const response = await axios.post('/api/forgot-password', {
                    email,
                });
                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error:', error.response.data);
            }
        }finally{

        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
                <form 
                action='{{/forgot-password}}'
                onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Password Reset Link'}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
