<?php

namespace App\Http\Controllers;

use App\Models\register;
// use App\Http\Requests\StoreregisterRequest;
use App\Http\Requests\UpdateregisterRequest;
use Illuminate\Http\Request;
class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return register::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
     $filds= $request->validate([
            'username'=>'required|max:255',  
            'email'=>'required|max:255',
            'course'=>'required|max:255',
            'country'=>'required|max:255',
            'job'=>'required|max:255',
            'course_enroll_date'=>'required|max:255',
            'phone_number'=>'required|max:255',
            'service'=>'required|max:255',
        ]);
        // return "ok";
       $register=register::create($filds);
      return ['register',$register];
    //  successfully register
    }
    /**
     * Display the specified resource.
     */
    public function show(register $register)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateregisterRequest $request, register $register)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //delete the user id wise
        $register = register::find($id);

    if ($register) {
        $register->delete();
        return response()->json(['message' => 'Entry deleted successfully'], 200);
    } else {
        return response()->json(['message' => 'Entry not found'], 404);
    }
    }



    // logout admin
//     public function deleteUser($username)
// {
//     // Find the user by username
//     $user = register::where('username,email', $username)->first();

//     if ($user) {
//         // Delete the user
//         $user->delete();
//         return response()->json(['message' => 'User deleted successfully.'], 200);
//     }

//     return response()->json(['message' => 'User not found.'], 404);
// }



}
