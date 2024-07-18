<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::Channel('message.{receiverId}', function ($user, $receiverId) {
    return (int) $user->id === (int) $receiverId;
});
