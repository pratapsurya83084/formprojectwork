<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('/registers',RegisterController::class);

Route::delete('/delete/{id}', [RegisterController::class, 'destroy']);

// admin login

Route::put('/update-password', [AdminController::class, 'updatePassword']);
Route::post('/login', [AdminController::class, 'adminLogin']);
// get all admin user
Route::get('/getadmindetail', [AdminController::class, 'getAllUsers']);
// Route::middleware('auth:sanctum')->post('/login', function (Request $request) {
//     return $request->user();
// });

//adminlogout route
Route::post('/logout', [AdminController::class, 'adminlogout'])->middleware('auth:sanctum');



Route::get('/',function(){
    return 'api';
});