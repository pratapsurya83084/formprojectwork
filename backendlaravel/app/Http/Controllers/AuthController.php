<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //admin logins

    public function register(Request $request)
    {
        // Validate the incoming request
        $fields = $request->validate([
            'name' => 'string',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);


        //  stored into table
      $user=User::create($fields);

       $token=$user->createToken($request->name);



         return [
          'user'=>$user,
          'token'=>$token->plainTextToken
         ];

        }

       public function loginuser(Request $request){
// Validate the incoming request
$fields = $request->validate([
    // 'name' => 'string',
    'email' => 'required|email|exists:users',
    'password' => 'required',
]);

$user=User::where('email',$request->email)->first();

 if (!$user || !Hash::check($request->password , $user->password)) {
  return [
'message'=>"provide creadential is invalid ?
please enter correct password",
  ];
 }

 //if password and creadential is correct the create a new Token

       $token=$user->createToken($user->name);

         return [
          'user'=>$user,
          'token'=>$token->plainTextToken
         ];
       }
// logout user
       public  function logout(Request $request){
        $request->user()->tokens()->delete();
        return[
            'message'=>"Logged out successfully",
        ];
        }

    }

