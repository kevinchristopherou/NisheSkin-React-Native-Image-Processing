<?php

namespace App\Http\Controllers\Admin;

use App\Post;
use Illuminate\Http\Request;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
class PostController extends Controller
{
    public function index()
    {
        $post=DB::table('posts')->get();
        return view('admin.blogs',compact('post'));
    }

    public function CreateOrUpdate(Request $request)
    {
        if($request->post_id_hidden!="")
        {
            $post=DB::table('posts')->where('id', $request->post_id_hidden)->get();
            if($request->hasfile('post_image1')){
                $file = $request->file('post_image1');
                $file -> move('upload/post/', $request->post_id_hidden.'_1.png');
            }
            if($request->hasfile('post_image2')){
                $file = $request->file('post_image2');
                $file -> move('upload/post/', $request->post_id_hidden.'_2.png');
            }
            post::where('id', $request->post_id_hidden)
            ->update(['name'=>$request->post_name,
                      'category'=>$request->category,
                      'details'=>$request->details,
                      'desc'=>$request->desc]);
        }
        else
        {

            $post = post::create(['name'=>$request->post_name,
                'category'=>$request->category,
                'details'=>$request->details,
                'desc'=>$request->desc]);
            if($request->hasfile('post_image')){
                $file = $request->file('post_image');
                $file -> move('upload/post/', $post->id.'_1.png');
            }
        }
        return redirect('/admin/blog');
    }
    public function Read(Request $request)
    {
        $post=DB::table('posts')->where('id', $request->id)->get();

        return response()->json(['data'=>$post]);
    }
    public function Delete(Request $request)
    {
        File::delete("upload/post/".$request->id."_1.png");
        File::delete("upload/post/".$request->id."_2.png");
        DB::table('posts')->where('id', $request->id)->delete();

        return response()->json(['data'=>'success']);
    }
}
