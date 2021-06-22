<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Post;

class PostController extends Controller
{
    //
    public function index($id = '')
    {
        if($id == '') {
            $posts = Post::where(['category' => 1])->get()->toArray();
            return view('blog')->with(['posts' => $posts]);
        }
        else{
            $post = Post::where(['id' => $id])->first();
            return view('details')->with(['post' => $post]);
        }
    }

    public function filter(Request $request){
        $category = $request->input('category', '');
        if($category === '')
            return "Request Error";
        $posts = Post::where(['category' => $category])->get()->toArray();
        return $posts;
    }
}
