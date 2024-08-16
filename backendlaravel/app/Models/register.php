<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class register extends Model
{
    use HasFactory;

    protected $fillable=[
        'username',
         'email', 
        'phone_number',
         'country',
        'job', 
        'course_enroll_date',
         'course',
    ];
}
