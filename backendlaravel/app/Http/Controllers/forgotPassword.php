<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPassword extends Controller
{
    /**
     * Send a password reset link to the given email address.
     */
    public function sendResetEmail(Request $request)
    {
        // Validate the email field
        $request->validate([
            'email' => 'required|email'
        ]);

        // Attempt to send the reset link
        $status = Password::sendResetLink($request->only('email'));

        // Return response based on the status
        return $status == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Password reset link sent to your email.'], 200)
            : response()->json(['message' => 'Failed to send password reset link.'], 400);
    }
}
