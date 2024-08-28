<?php

namespace App\Http\Controllers;

use App\Models\Adminlogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
class ResetPasswordController extends Controller
{
    //
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $response = Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => $response == Password::RESET_LINK_SENT 
            ? 'Password reset link sent to your email.'
            // print this console 422 (Unprocessable Content)
            : 'Unable to send reset link.',  'status' => __($response)
        ],422);
    }



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
