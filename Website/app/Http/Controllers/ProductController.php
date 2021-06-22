<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Product;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::all()->toArray();
        return view('products')->with(['products' => $products]);
    }

    public function filter(Request $request)
    {
        $type1 = $request->input('type1', '');
        $type2 = $request->input('type2', '');
        $type3 = $request->input('type3', '');
        $brand = $request->input('brand', '');
        if ($type1 == '' || $type2 == '' || $type3 == '' || $brand == '') {
            return 'Request Error';
        }
        $cond = [];
        if ($type1 != 0) {
            $cond['type1'] = $type1;
        }
        if ($type2 != 0) {
            $cond['type2'] = $type2;
        }
        if ($type3 != 0) {
            $cond['type3'] = $type3;
        }
        if ($brand != 0) {
            $cond['brand'] = $brand;
        }
        $products = Product::where($cond)
            ->get()
            ->toArray();
        return $products;
    }
}
