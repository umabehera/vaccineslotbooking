<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VaccineController;

// use App\Http\Controllers\Auth\RegisterController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::resource('vaccine',VaccineController::class);
Route::post('vaccine/checkAvailablity',[VaccineController::class,'checkAvailablity']);
Route::post('vaccine/store',[VaccineController::class,'store']);



