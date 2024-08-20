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
Route::post('/adminlogin', [AdminController::class,'adminLogin']);

// create a rouute to update admin password and uername
Route::put('/adminupdate/{id}', [AdminController::class,'updateAdmin']);

Route::get('/',function(){
    return 'api';
});