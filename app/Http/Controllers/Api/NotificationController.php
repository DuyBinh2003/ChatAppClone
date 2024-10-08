<?php

namespace App\Http\Controllers\Api;

use App\Events\NotificationCreated;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    function index(Request $request)
    {
        $user = $request->user();
        $notifications = $user->notifications;
        foreach ($notifications as $notification) {
            $notification = $notification->reference->user;
        }
        return response()->json($notifications);
    }

    function markAsRead(Request $request)
    {
        $user = $request->user();
        $user->unreadNotifications->markAsRead();
        return response()->json(['status' => 'success']);
    }

    function markAsReadById(Request $request, $id)
    {
        $user = $request->user();
        $notification = $user->notifications->where('id', $id)->first();
        if ($notification) {
            $notification->markAsRead();
            return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'failed']);
    }

    function numberNotice(Request $request)
    {
        $user = $request->user();
        $notificationsCount = $user->notifications()->where('is_notice', 1)->count();
        return response()->json($notificationsCount);
    }

    function readNotice(Request $request)
    {
        $user = $request->user();
        $user->notifications()->update(['is_notice' => 0]);
        return response()->json(['status' => 'success']);
    }

    public static function store($user_id, $reference_id, $type)
    {
        $notification = new Notification(
            [
                'user_id' => $user_id,
                'type' => $type,
                'reference_id' => $reference_id,
                'reference_type' => 'App\Models\\' . ucfirst($type),
                'read_at' => null,
            ]
        );
        $notification->save();
        NotificationCreated::dispatch($notification);
    }
}
