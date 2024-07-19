<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;

class FriendController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $userFriends = $this->getListFriend($user->id);
        foreach ($userFriends as $friend) {
            $friend->latestMessage = $this->getLatestMessage($user->id, $friend->id);
        }
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

    public static function getLatestMessage(String $id, String $friendId)
    {
        Carbon::setLocale('vn');
        $now = Carbon::now();

        $user = User::find($id);
        $messageSender = $user->messagesSend()->where('user_id_receive', $friendId)->orderBy('created_at', 'desc')->first();
        $messageReceive = $user->messagesReceive()->where('user_id_send', $friendId)->orderBy('created_at', 'desc')->first();

        if (
            $messageSender !== null && $messageReceive !== null
        ) {
            $messageLatest = $messageSender->created_at < $messageReceive->created_at ? $messageSender : $messageReceive;
            $messageLatest->release = $messageLatest->created_at->diffForHumans($now);
            return $messageSender;
        } else if ($messageSender !== null) {
            $messageSender->release = $messageSender->created_at->diffForHumans($now);
            return $messageSender;
        } else if ($messageReceive !== null) {
            $messageReceive->release = $messageReceive->created_at->diffForHumans($now);
            return $messageReceive;
        }
        return null;
    }
}
