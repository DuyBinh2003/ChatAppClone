<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\SearchController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('friends')->group(function () {
        Route::get('/', [FriendController::class, 'index']);
        Route::get('/{userId}', [FriendController::class, 'getListFriend']);
    });

    Route::prefix('user')->group(function () {
        Route::get('/', [AuthController::class, 'index']);
        Route::get('/{userId}', [UserController::class, 'getUser']);
    });

    Route::prefix('posts')->group(function () {
        Route::get("/", [PostController::class, 'index']);
        Route::get('/{userId}', [PostController::class, 'getUserPosts']);
        Route::post('/', [PostController::class, 'store']);
    });
    Route::get('/friends/{userId}', [FriendController::class, 'index']);
    Route::get('/messages/{friendId}', [MessageController::class, 'getListMessages']);
    Route::post('/message/{friendId}', [MessageController::class, 'addMessage']);

    Route::get('/search/{type}', [SearchController::class, 'index']);
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
