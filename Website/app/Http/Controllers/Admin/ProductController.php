<?php

namespace App\Http\Controllers\Admin;

use App\Product;
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
class ProductController extends Controller
{
    public function index()
    {
        $product=DB::table('products')->get();
        return view('admin.products',compact('product'));
    }

    public function CreateOrUpdate(Request $request)
    {
        if($request->product_id_hidden!="")
        {
            $product=DB::table('products')->where('id', $request->product_id_hidden)->get();
            if($request->hasfile('product_image')){
                $file = $request->file('product_image');
                $extension = $file->getClientOriginalExtension();
                $file -> move('upload/product/', $request->product_id_hidden.'.png');
            }
            Product::where('id', $request->product_id_hidden)
            ->update(['name'=>$request->product_name,
                      'url'=>$request->url,
                      'type1'=>$request->type1,
                      'type2'=>$request->type2,
                      'type3'=>$request->type3,
                      'brand'=>$request->brand,
                      'popular'=>$request->popular,
//                      'fashion'=>$request->fashion,
                      'desc'=>$request->desc]);
        }
        else
        {

            $product = Product::create(['name'=>$request->product_name,
                    'url'=>$request->url,
                    'type1'=>$request->type1,
                    'type2'=>$request->type2,
                    'type3'=>$request->type3,
                    'brand'=>$request->brand,
                    'popular'=>$request->popular,
//                    'fashion'=>$request->fashion,
                    'desc'=>$request->desc]);
            if($request->hasfile('product_image')){
                $file = $request->file('product_image');
                $extension = $file->getClientOriginalExtension();
                $file -> move('upload/product/', $product->id.'.png');
            }
        }
        return redirect('/admin/product');
    }
    public function Read(Request $request)
    {
        $product=DB::table('products')->where('id', $request->id)->get();

        return response()->json(['data'=>$product]);
    }
    public function Delete(Request $request)
    {
        File::delete("upload/product/".$request->id.".png");
        DB::table('products')->where('id', $request->id)->delete();

        return response()->json(['data'=>'success']);
    }
}
