<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('message.{receiverId}', function ($user, $receiverId) {
    return (int) $user->id === (int) $receiverId;
});
Broadcast::channel('post.{receiverId}', function ($user, $receiverId) {
    // Chỉ người dùng với ID khớp mới có thể nghe kênh này
    return $user->id === (int) $receiverId;
});
