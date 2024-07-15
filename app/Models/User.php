<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avt_img',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the posts for the user.
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Get the post attributes for the user.
     */
    public function postAttributes()
    {
        return $this->hasMany(PostAttribute::class);
    }

    /**
     * Get the comments for the user.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the friends for the user.
     */
    public function friendsSent()
    {
        return $this->hasMany(Friend::class, 'user_id_send');
    }

    /**
     * Get the friends for the user.
     */
    public function friendsReceived()
    {
        return $this->hasMany(Friend::class, 'user_id_receive');
    }
    /**
     * Get the messages for the user.
     */
    public function messagesSend()
    {
        return $this->hasMany(Message::class, 'user_id_send');
    }
    /**
     * Get the messages for the user.
     */
    public function messagesReceive()
    {
        return $this->hasMany(Message::class, 'user_id_receive');
    }
}
