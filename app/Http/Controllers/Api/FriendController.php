<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $userFriends = $this->getListFriend($user->id);
        return response()->json($userFriends);
    }

    public static function getListFriend(String $id)
    {
        $user = User::find($id);
        $friendSenders = $user->friendsSent()->where('status', 'accepted');
        $frỉendReceivers = $user->friendsReceived()->where('status', 'accepted');

        $friendSenders = $friendSenders->get()->map(function ($friend) {
            return $friend->receiver;
        });
        $frỉendReceivers = $frỉendReceivers->get()->map(function ($friend) {
            return $friend->sender;
        });

        return $friendSenders->merge($frỉendReceivers);
    }
}
