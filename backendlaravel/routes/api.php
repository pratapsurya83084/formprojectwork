<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::apiResource('/registers',RegisterController::class);

Route::delete('/delete/{id}', [RegisterController::class, 'destroy']);
// delete admin /logout
// Route::delete('/api/deleteUser/{username}', [RegisterController::class, 'deleteUser']);


Route::get('/',function(){
    return 'api';
});