<?php

use App\Http\Controllers\AdminController;

use App\Http\Controllers\RegisterController;


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



// create userAdmin newPassword Route
Route::post('/createnewadmin', [AdminController::class,'UpdateUserAdminPassword']);






// Route::get('/',function(){
//     return 'api';
// });