<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Adminlogin;

// class AdminController extends Controller
// {
//     //


//     public function adminLogin(Request $request)
//     {
//      $filds= $request->validate([
//             'username'=>'required|max:255',  
//             'email'=>'required|max:255',
//             'password'=>'required|max:255',
            
//         ]);
//         // return "ok";
//        $login=Adminlogin::create($filds);
//       return ['Adminlogin',$login];
//       return response()->json(['message' => 'Login successfully'], 200);

//     //  successfully register
//     }


    
// }


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Adminlogin;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function adminLogin(Request $request)
    {
        // Validate the input fields
        $fields = $request->validate([
            'username' => 'required|max:255',  
            'email' => 'required|email|max:255',
            'password' => 'required|max:255',
        ]);

        // Check if the user with the same username or email already exists
        $existingUser = Adminlogin::where('username', $fields['username'])
                                  ->orWhere('email', $fields['email'])
                                  ->first();

        if ($existingUser) {
            // If user already exists, return an error response
            return response()->json([
                'message' => 'Username or email already in use. Please try a different one.'
            ], 409); // 409 Conflict status code
        }

        // Hash the password before storing it in the database
        $fields['password'] = Hash::make($fields['password']);

        // Create a new admin login record
        $login = Adminlogin::create($fields);

        // Redirect to the admin page or return a success response
        return response()->json([
            'message' => 'Login successfully',
            'redirect_url' => url('/admin') // Adjust this URL to your actual admin page
        ], 200);
    }



    // update uername and password
    public function updateAdmin(Request $request, $id)
    {
        $admin = Adminlogin::find($id);

        if (!$admin) {
            return response()->json([
               'message' => 'Admin not found'
            ], 404);
        }

        $fields = $request->validate([
            'username' => 'required|max:255',
            'email'=>'required|max:255',
            'password' => 'required',
        ]);

        $fields['password'] = Hash::make($fields['password']);

        $admin->update($fields);

        return response()->json([
           'message' => 'Admin updated successfully'
        ], 200);
    }
    
}

