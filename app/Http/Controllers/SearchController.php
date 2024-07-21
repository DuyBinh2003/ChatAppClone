<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;

class SearchController extends Controller
{
    public function index(Request $request, $type)
    {
        $q = $request->get('q');
        switch ($type) {
            case 'user':
                $result = $this->userSearch($q);
                break;
            case 'post':
                $result = $this->postSearch($q);
                break;
            default:
                $result = new \stdClass();
                $result->users = $this->userSearch($q, 3);
                $result->posts = $this->postSearch($q, 3);
                break;
        }

        return response()->json($result);
    }

    public function userSearch($q, $num = 5)
    {
        $result = User::where('name', 'like', '%' . $q . '%')->take($num)->get();
        return $result;
    }
    public function postSearch($q, $num = 5)
    {
        $result = Post::where('content', 'like', '%' . $q . '%')->take($num)->get();
        $result = PostController::addAttributes($result);
        return $result;
    }
}
