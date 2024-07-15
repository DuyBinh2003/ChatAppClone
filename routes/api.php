<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\MessageController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'index']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/friends', [FriendController::class, 'index']);
    Route::get('/messages/{friendId}', [MessageController::class, 'getListMessages']);
    Route::post('/message/{friendId}', [MessageController::class, 'addMessage']);
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
