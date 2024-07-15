<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PostController extends Controller
{
    public function index(Request $request)
    {
        Carbon::setLocale('en');
        $now = Carbon::now();

        $user = $request->user();
        $userFriends = FriendController::getListFriend($user->id);
        $post = $user->posts;

        foreach ($userFriends as $friend) {
            $post = $post->merge($friend->posts);
        }

        $post = $post->shuffle();

        foreach ($post as $p) {
            $p->user = $p->user;
            $p->release = $p->created_at->diffForHumans($now);
            foreach ($p->comments as $c) {
                $c->user = $c->user;
            }
            $p->post_attributes = $p->postAttributes;
        }

        return response()->json($post);
    }
}
