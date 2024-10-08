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
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


        //check user email is  already in table if existe then show message
  //set admin email , password  and comment out once create new email  
        // $user = Adminlogin::create([

        //     'email' => $data['email'],
        //     'password' => Hash::make($data['password']), // Hash the password before saving
        // ]);
        // $token = $user->createToken($user->email);
        // return [
        //     'user' => $user,
        //     'token' => $token,
        // ];

        $user = Adminlogin::where('email', $request->email)->first();
        $userPassword = Adminlogin::where('password', $request->password)->first();

        // Adminlogin password and request password not equal the cannot create newToken
        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => "provide creadential is invalid?
        please enter correct password and email",
            ];
        } else {
            //if user is existes then generate new token
            $token = $user->createToken($user->email)->plainTextToken;
            return [
                'message' => "login Successfully ",
                'user' => $user,
                'login' => true,
                'token' => $token,
            ];
        }



        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => "provide creadential is invalid ?
        please enter correct password and email",
            ];
        }








        //   below code correct without token hash password stored 
        // $user = Adminlogin::where(['email' => $request->email, 'password' => $request->password])->first();

        // if (!empty($user)) {
        //     return response()->json([
        //         'login' => true,
        //         'message' => 'Login successful',
        //         'user' => $user,
        //         'data-frontend' => $data,
        //     ]);
        // } else {
        //     return response()->json([
        //         'login' => false,
        //         'message' => 'Login Unsuccessful',
        //         'user' => $user,
        //         'data-frontend' => $data,
        //     ]);
        // }



    }



    // logout user i.e token
    public  function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => "Logged out successfully",
        ];
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
        $newData = $request->validate([
            'email' => 'required|email',
            'currentPassword' => 'required',
            'newPassword' => 'required',
        ]);

        // Find the admin by email
        $admin = Adminlogin::where('email', $request->email)->first();

        // Check if the admin exists and the current password matches
        if ($admin && Hash::check($request->currentPassword, $admin->password)) {
            // Update the password
            $admin->password = Hash::make($request->newPassword);
            $admin->save();

            return response()->json([
                'update' => true,
                'message' => 'Password updated successfully'
            ], 200);
        } else {
            return response()->json([
                'update' => false,
                'message' => 'Email or current password is incorrect'
            ], 401);
        }




        // if (!empty($admin)) {
        //     $admin->password = Hash::make($request->newPassword);
        //     $admin->save();
        //     // Return the updated admin data
        //     return response()->json([
        //         'update' => true,
        //         'user' => $admin,
        //     ]);
        // }

        // return response()->json([
        //     'message' => 'Password update failed or invalid credentials',
        //     'update' => false,
        // ], 401);
    }





// create user with new password
public function UpdateUserAdminPassword(Request $request){
    $request->validate([
            'email' => 'required|email',
            'currentPassword' => 'required',
            'newPassword' => 'required',
    ]);



   // Find the admin by email
   $admin = Adminlogin::where('email', $request->email)->first();

   if ($request->newPassword !=$request->currentPassword) {
   return[
    'message'=>'password does not match',
   ];
   }

   //if admin email is exists in table then update its password by newPassword
   // if not exist then return error message
   if ($admin) {
    // Update the password
    $admin->password = Hash::make($request->newPassword);
    $admin->save();

    return response()->json([
        'update' => true,
        'message' => 'Password updated successfully'
    ], 200);
  
   }else {

        return response()->json([
            'update' => false,
            'message' => 'Email is incorrect'
        ], 401);
    
    }

//    if ($admin && Hash::check($request->currentPassword, $admin->password)) {
//     // Update the password
//     $admin->password = Hash::make($request->newPassword);
//     $admin->save();

//     return response()->json([
//         'update' => true,
//         'message' => 'create New adminUser Password updated successfully'
//     ], 200);

// }else {

//     return response()->json([
//         'update' => false,
//         'message' => 'Email or password is incorrect'
//     ], 401);


}


}
