<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;

class PostController extends Controller
{
    public function index(Request $request)
    {
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

        $paginatedPosts = $this->addAttributes($paginatedPosts);

        return response()->json($paginatedPosts);
    }

    public function getUserPosts(Request $request)
    {
        $perPage = 5;
        $page = $request->get('page', 1);
        $offset = ($page - 1) * $perPage;
        $userId = $request->userId;
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $post = $user->posts;
        $post = $post->sortByDesc('created_at');
        $paginatedPosts = $post->slice($offset, $perPage)->values();

        $paginatedPosts = $this->addAttributes($paginatedPosts);

        return response()->json($paginatedPosts);
    }

    public static function addAttributes($post)
    {
        Carbon::setLocale('en');
        $now = Carbon::now();

        foreach ($post as $p) {
            $p->user = $p->user;
            $p->release = $p->created_at->diffForHumans($now);
            foreach ($p->comments as $c) {
                $c->user = $c->user;
            }
            $p->post_attributes = $p->postAttributes;
        }
        return $post;
    }
}
