<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Adminlogin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{


    // admin login
    // public function adminLogin(Request $request)
    // {
    //     $admindata =  $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required',
    //     ]);

    //     // add admindata into database
    //     // $addmin = Adminlogin::create($admindata);
    //     // return $addmin;

    //     $user = Adminlogin::where('email', $request->email)->first();

    //     // if ($user && Hash::check($request->password, $user->password)) {


    //     if ($request->password === $user->password) {

    //         $token = $user->createToken('Personal Access Token')->plainTextToken;

    //         return response()->json([
    //             'token' => $token,
    //             'user' => $user,
    //         ]);
    //     }

    //     // return response()->json(['error' => 'Unauthorized'], 401);
    //     return response()->json(['error' => $admindata], 401);
    // }


    public function adminLogin(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        
        //check user email is  already in table if existe then show message

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
        if (!$user ||!Hash::check($request->password, $user->password)) {
            return [
               'message' => "provide creadential is invalid?
        please enter correct password and email",
            ];
        }else{
            //if user is existes then generate new token
            $token = $user->createToken($user->email)->plainTextToken;
            return [
               'message' => "login Successfully ",
                'user' => $user,
                'login'=>true,
                'token' => $token,
            ];
        }




        if (!$user || !$userPassword) {
            //if user is not existes then Create a new user with hashed password
            //    but no need to create a  more user
            // $user = Adminlogin::create([

            //     'email' => $data['email'],
            //     'password' => Hash::make($data['password']), // Hash the password before saving
            // ]);
            // $token = $user->createToken($user->email);
            // return [
            //     'user' => $user,
            //     'token' => $token,
            // ];
        } else {
            // $token = $user->createToken($user->email);

            // return [
            //     'message' => "login Successfully ",
            //     'user' => $user,
            //     'token' => $token->plainTextToken,
            //     // 'message' => "User already exist. please login",
            // ];
        }
   



        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => "provide creadential is invalid ?
        please enter correct password and email",
            ];
        }

        //if password and creadential is correct the create a new Token

        //    $token=$user->createToken($user->name);

        //      return [
        //         'message'=>"login Successfully ",
        //       'user'=>$user,
        //       'token'=>$token->plainTextToken
        //      ];







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

        $admin = Adminlogin::where('email', $request->email)->first();


   //check request password ,email is correct match to Adminlogin password ,email if not match then show messgae invalid
    // if (!$admin ||!Hash::check($request->currentPassword, $admin->password)) {
    //     return[
    //         'message'=>'invalid email or current password',
    //     ];
    //     }



    //  007 ,current paas= pratap12345
//     $passwordCheck = Adminlogin::where('password', Hash::make($request->newPassword))->first();  
//      if (!$passwordCheck) {
//         return[
//   'message'=>'incorrect Current password Please 
//   Enter Correct Password',
//         ];
//      }





        if (!empty($admin)) {
            $admin->password = Hash::make($request->newPassword);
            $admin->save();
            // Return the updated admin data
            return response()->json([
                'update' => true,
                'user' => $admin,
            ]);
        }

        return response()->json([
            'message' => 'Password update failed or invalid credentials',
            'update' => false,
        ], 401);
    }
}
