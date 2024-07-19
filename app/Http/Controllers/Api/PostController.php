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

        $perPage = 5;
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $perPage;
        $user = $request->user();
        $userFriends = FriendController::getListFriend($user->id);
        $post = $user->posts;
        foreach ($userFriends as $friend) {
            $post = $post->merge($friend->posts);
        }

        $post = $post->sortByDesc('created_at');
        $paginatedPosts = $post->slice($offset, $perPage)->values();

        foreach ($paginatedPosts as $p) {
            $p->user = $p->user;
            $p->release = $p->created_at->diffForHumans($now);
            foreach ($p->comments as $c) {
                $c->user = $c->user;
            }
            $p->post_attributes = $p->postAttributes;
        }

        return response()->json($paginatedPosts);
    }
}
