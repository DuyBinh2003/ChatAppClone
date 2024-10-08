<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Broadcast;



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

    Route::prefix('messages')->group(function () {
        Route::get('/{friendId}', [MessageController::class, 'getListMessages']);
        Route::post('/{friendId}', [MessageController::class, 'addMessage']);
    });
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/numberNotice', [NotificationController::class, 'numberNotice']);
        Route::post('/readNotice', [NotificationController::class, 'readNotice']);
        Route::post('/markAsRead', [NotificationController::class, 'markAsRead']);
        Route::post('/markAsRead/{id}', [NotificationController::class, 'markAsReadById']);
    });

    Route::get('/search/{type}', [SearchController::class, 'index']);
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
