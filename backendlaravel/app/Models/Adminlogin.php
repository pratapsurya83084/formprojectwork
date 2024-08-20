<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Adminlogin extends Model
{
    use HasFactory,HasApiTokens;

    protected $fillable = ['email', 'password'];

  // Automatically hash the password when it's set
  public function setPasswordAttribute($value)
  {
      $this->attributes['password'] = bcrypt($value);
  }
}
