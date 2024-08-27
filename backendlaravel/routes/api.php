<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPassword;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// register user
Route::apiResource('/registers',RegisterController::class);
// delete user entry
Route::delete('/delete/{id}', [RegisterController::class, 'destroy']);





// -----------------login section----------------------
// admin login
Route::post('/login', [AdminController::class, 'adminLogin']);
//logout user
Route::post('/logout',[AdminController::class,'logout'])->
middleware('auth:sanctum');
// update admin password
Route::post('/update-password', [AdminController::class, 'updatePassword']);

// get all admin user
Route::get('/getadmindetail', [AdminController::class, 'getAllUsers']);



//--------------testing api--------------
// route login with token
Route::post('/loginadmin', [AuthController::class, 'register']);

Route::post('/logintest',[AuthController::class,'loginuser']);
// only logged user can logout if user not login then click logout erro create unauthenticated 
Route::post('/logout',[AuthController::class,'logout'])->
middleware('auth:sanctum');






//forgot password route  reset password
Route::middleware('guest')->group(function(){

    // Route::view('/forgot-password','auth.forgot-password')->name('password.request');

    Route::post('/forgot-password',[ResetPasswordController::class,
    'passwordEmail']);

    Route::get('/reset-password/{token}',[ResetPasswordController::class,'PasswordReset'])
    ->name('password.reset');


    //last route
    Route::post('/reset-password',[ResetPasswordController::class,'passwordUpdate'])
    ->name('password.update');
});


Route::get('/',function(){
    return 'api';
});