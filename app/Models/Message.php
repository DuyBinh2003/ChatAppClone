<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id_send',
        'user_id_receive',
        'content',
    ];

    /**
     * Get the user that receive the message.
     */
    public function userReceive()
    {
        return $this->belongsTo(User::class, 'user_id_receive');
    }
    /**
     * Get the user that send the message.
     */
    public function userSend()
    {
        return $this->belongsTo(User::class, 'user_id_send');
    }
}
