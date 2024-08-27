<?php

namespace App\Models;


use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


use Illuminate\Contracts\Auth\CanResetPassword;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Adminlogin extends Authenticatable implements MustVerifyEmail,CanResetPassword{
  // HasApiTokens,
  use HasFactory, Notifiable,HasApiTokens;

  protected $fillable = ['email', 'password'];

  // Automatically hash the password when it's set
  public function setPasswordAttribute($value)
  {
    // $this->attributes['password'] = bcrypt($value);
    $this->attributes['password'] = $value;
  }
  
}
