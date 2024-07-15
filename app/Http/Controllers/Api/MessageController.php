<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSendEvent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use PhpParser\Node\Expr\FuncCall;

class MessageController extends Controller
{
    public function getListMessages(Request $request, string $friendId)
    {
        $user = $request->user();

        $messageSent = Message::where('user_id_send', $user->id)
            ->where('user_id_receive', $friendId)
            ->get();
        $messageReceived = Message::where('user_id_send', $friendId)
            ->where('user_id_receive', $user->id)
            ->get();

        $messages = $messageSent->merge($messageReceived)->toArray();
        usort($messages, function ($a, $b) {
            return strcmp($b['created_at'], $a['created_at']);
        });
        return response()->json($messages);
    }

    public function addMessage(Request $request, string $friendId)
    {
        $user = $request->user();
        $message = new Message(
            [
                'user_id_send' => $user->id,
                'user_id_receive' => $friendId,
                'content' => $request->message,
                'created_at' => now(),
            ]
        );
        $message->save();
    }
}
