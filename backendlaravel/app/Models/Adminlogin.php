<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Adminlogin extends Model  
{
    use HasFactory,HasApiTokens,Notifiable;

    protected $fillable = ['email', 'password'];

  // Automatically hash the password when it's set
  public function setPasswordAttribute($value)
  {
      $this->attributes['password'] = bcrypt($value);
  }
}
