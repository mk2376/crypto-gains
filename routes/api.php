<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Open_ordersController;
use App\Http\Controllers\Api\Past_tradesController;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('sign-up', [AuthController::class, 'signUp']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    //Route::get('user-profile', [AuthController::class, 'userProfile']);
});

Route::middleware('auth:api')->prefix('call')->group(function () {                             // Call protected /api/call/... for REST API
    Route::get('test', function () {                               
        return response()->json(['data' => 'REST API is working.']);
    });
    Route::post('archive-open_order', [Open_ordersController::class, 'archiveOpen_order']);

    Route::post('create-open_order', [Open_ordersController::class, 'createOpen_order']);
    Route::post('update-open_order', [Open_ordersController::class, 'updateOpen_order']);
    Route::post('delete-open_order', [Open_ordersController::class, 'deleteOpen_order']);
    Route::post('delete-open_order', [Open_ordersController::class, 'deleteOpen_order']);
    Route::post('read-open_orders', [Open_ordersController::class, 'readOpen_orders']);

    Route::post('create-past_trade', [Past_tradesController::class, 'createPast_trade']);
    Route::post('update-past_trade', [Past_tradesController::class, 'updatePast_trade']);
    Route::post('delete-past_trade', [Past_tradesController::class, 'deletePast_trade']);
    Route::post('delete-past_trade', [Past_tradesController::class, 'deletePast_trade']);
    Route::post('read-past_trades', [Past_tradesController::class, 'readPast_trades']);
});
