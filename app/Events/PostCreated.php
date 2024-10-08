<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class PostCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public $post;
    public $friends;

    public function __construct($post, $friends)
    {
        $this->post = $post;
        $this->friends = $friends; // Nếu bạn cũng muốn gửi danh sách bạn bè
    }

    public function broadcastOn()
    {
        Log::info($this->friends->toArray());
        return array_map(function ($friend) {
            return new PrivateChannel('post.' . $friend['id']);
        }, $this->friends->toArray()); // Chuyển đổi thành mảng ở đây
    }

    public function broadcastWith()
    {
        return [
            'post' => $this->post,
        ];
    }
}
