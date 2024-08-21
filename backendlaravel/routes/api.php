<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// register user
Route::apiResource('/registers',RegisterController::class);
// delete user entry
Route::delete('/delete/{id}', [RegisterController::class, 'destroy']);


// admin login
Route::put('/update-password', [AdminController::class, 'updatePassword']);
Route::post('/login', [AdminController::class, 'adminLogin']);
// get all admin user
Route::get('/getadmindetail', [AdminController::class, 'getAllUsers']);




Route::get('/',function(){
    return 'api';
});