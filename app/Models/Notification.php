<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    // Các trường có thể mass assign
    protected $fillable = [
        'user_id',
        'type',
        'reference_id',
        'reference_type',
        'data',
        'read_at',
    ];

    // Chuyển đổi các trường JSON thành mảng
    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];

    /**
     * Quan hệ đa hình đến các mô hình liên quan.
     */
    public function reference(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Quan hệ đến người dùng nhận thông báo.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
