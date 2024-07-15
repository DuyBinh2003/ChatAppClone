<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id_send',
        'user_id_receive',
        'status',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'user_id_send');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'user_id_receive');
    }
}
