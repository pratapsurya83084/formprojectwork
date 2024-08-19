<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Adminlogin;
class AdminController extends Controller
{
    //


    public function adminLogin(Request $request)
    {
     $filds= $request->validate([
            'username'=>'required|max:255',  
            'email'=>'required|max:255',
            'password'=>'required|max:255',
            
        ]);
        // return "ok";
       $login=Adminlogin::create($filds);
      return ['Adminlogin',$login];
      return response()->json(['message' => 'Login successfully'], 200);

    //  successfully register
    }
}
