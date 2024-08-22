<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Adminlogin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{


    // admin login
    public function adminLogin(Request $request)
    {
      $admindata=  $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // add admindata into database
        // $addmin=Adminlogin::create($admindata);
        // return $addmin;
        

        $user = Adminlogin::where('email', $request->email)->first();
    
        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('Personal Access Token')->plainTextToken;
    
            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        }
    
        return response()->json(['error' => 'Unauthorized'], 401);
    }








        // Method to fetch all users
        public function getAllUsers()
        {
            // Fetch all users from the database
            $users = Adminlogin::all();
    
            // Return the users as a JSON response
            return response()->json($users, 200);
        }    


        // public function adminLogout(Request $request)
        // {
        //     // Ensure the user is authenticated
        //     $user = Auth::user();
    
        //     if ($user) {
        //         // Revoke all tokens issued to the user
        //         // $user->admintokens()->delete();
    
        //         return response()->json([
        //             'message' => 'Logged out successfully'
        //         ], 200);
        //     }
    
        //     return response()->json([
        //         'message' => 'No authenticated user found'
        //     ], 404);
        // }



    //make a method update admin email and password id wise
   
    public function updatePassword(Request $request)

    {
        $request->validate([
            'email' => 'required|email',
            'currentPassword' => 'required',
            'newPassword' => 'required',
        ]);

        $admin = Adminlogin::where('email', $request->email)->first();

        if ($admin && Hash::check($request->currentPassword, $admin->password)) {
            $admin->password = Hash::make($request->newPassword);
            $admin->save();

            // Generate new token
            $token = $admin->createToken('Personal Access Token')->plainTextToken;

            // Return the updated admin data
            return response()->json([
                'token' => $token,
                'user' => $admin,
            ]);
        }

        return response()->json([
            'message' => 'Password update failed or invalid credentials',
        ], 401);
    }
    }