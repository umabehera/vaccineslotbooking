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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => 'api'], function ($routes) {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::get('user', [UserController::class, 'user']);
    // Route::post('vaccine/checkAvailablity', [VaccineController::class, 'checkAvailablity']);
});


// Route::post('register', [UserController::class, 'register']);
// Route::resource('vaccine', VaccineController::class);
// Route::group(['middleware' => 'api', 'adminpages'], function () {
// Route::resource('vaccine', VaccineController::class);
Route::middleware('auth:api', 'adminpages')->post('vaccine/showall', [VaccineController::class, 'index']);

Route::middleware('auth:api', 'adminpages')->get('vaccine/create', [VaccineController::class, 'create']);


Route::middleware('auth:api', 'adminpages')->get('vaccine/{id}/edit', [VaccineController::class, 'edit']);

Route::middleware('auth:api', 'adminpages')->put('vaccine/{id}', [VaccineController::class, 'update']);

Route::middleware('auth:api')->get('vaccine/show', [VaccineController::class, 'show']);

Route::middleware('auth:api', 'adminpages')->delete('vaccine/{id}', [VaccineController::class, 'destroy']);
// });
Route::middleware('auth:api')->post('vaccine', [VaccineController::class, 'store']);

Route::middleware('auth:api', 'adminpages')->post('vaccine/checkAvailablity', [VaccineController::class, 'checkAvailablity']);
Route::middleware('auth:api')->post('vaccine/store', [VaccineController::class, 'store']);
Route::view('noaccess', 'welcome');
