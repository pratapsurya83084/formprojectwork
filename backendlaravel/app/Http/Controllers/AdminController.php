<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Adminlogin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function adminLogin(Request $request)
    {
        // Validate the input fields
        $admindetails = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

$addmin=Adminlogin::create($admindetails);
return $addmin;
$token=$Adminlogin->createToken($request->email);


// check password
$admin=adminLogin::where('email',$request->email)->first();

if (!$admin || !Hash::check($request->password,$admin->password)) {
    return[
        'message' => 'Invalid credentials',
        // 'error_code' => 401,
    ];
}

$token=$admin->createToken($admin->email);
return [
//     'adminaccess_token' => $token->plainTextToken,
//     'token_type' => 'Bearer',
    'user'=>$admin,
    'admintoken' => $token->plainTextToken,
];
        // Check if the admin with the provided email exists
    
    
    }

        // Method to fetch all users
        public function getAllUsers()
        {
            // Fetch all users from the database
            $users = Adminlogin::all();
    
            // Return the users as a JSON response
            return response()->json($users, 200);
        }    


        public function adminLogout(Request $request)
        {
            // Ensure the user is authenticated
            $user = Auth::user();
    
            if ($user) {
                // Revoke all tokens issued to the user
                $user->admintokens()->delete();
    
                return response()->json([
                    'message' => 'Logged out successfully'
                ], 200);
            }
    
            return response()->json([
                'message' => 'No authenticated user found'
            ], 404);
        }


    }