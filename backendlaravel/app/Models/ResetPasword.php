<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;

class ResetPassword extends Authenticatable implements CanResetPassword
{
    use Notifiable, CanResetPasswordTrait;

    // Your model properties and methods
    protected $fillable = [
      
         'email', 
        
     ];
}
