<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function getUser($userId)
    {
        $user = User::find($userId);
        if ($user) {
            $user->numfriends = FriendController::getListFriend($userId)->count();
            return response()->json($user);
        }
        return response()->json(['message' => 'User not found'], 404);
    }
}
