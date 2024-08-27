<?php

namespace App\Http\Controllers;
use App\Models\Adminlogin;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
class ResetPasswordController extends Controller
{
    //
    public function passwordEmail(Request $request) {
        

        $email = $request->validate([
            'email' => 'required|email'
        ]);
    
        $status = Password::sendResetLink($email);
    
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Password reset link sent successfully',
                'status' => __($status)
            ]);

        } else {
            return response()->json([
                'error' => __($status),
            ], 422);
        }
    }
    
  



    // send token token not create here
public  function PasswordReset(string $token) {
    return view('auth.reset-password', ['token' => $token]);
}



public  function passwordUpdate(Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|confirmed',
    ]);
 
    $status = Password::reset(
        $request->only('email',
         'password', 
         'password_confirmation', 
         'token'),
        function (Adminlogin $user, string $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));
 
            $user->save();
 
            event(new PasswordReset($user));
        }
    );
 
    return $status === Password::PASSWORD_RESET
                ? redirect()->route('login')->with('status', __($status))
                : back()->withErrors(['email' => [__($status)]]);
}


}
