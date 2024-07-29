<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Post;
use App\Events\CreatePostEvent;
use Illuminate\Support\Facades\Storage;

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

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Store the uploaded image in the public disk
            $imagePath = $request->file('image')->store('images', 'public');

            // Get the URL to the stored image
            $imageUrl = Storage::disk('public')->url($imagePath);
        } else {
            $imageUrl = null;
        }

        $post = new Post([
            'user_id' => $request->user()->id,
            'content' => $request->content,
            'image' => $imageUrl,
        ]);
        $post->save();

        $friends = FriendController::getListFriend($request->user()->id);
        event(new CreatePostEvent($post, $friends));

        return response()->json($post, 201);
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
