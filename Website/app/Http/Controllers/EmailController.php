<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Subscribe;

class EmailController extends Controller
{
    public function subscribe(Request $request){
        $email = $request->input('email', '');
        if($email === '')
            return "Request Error";
        Subscribe::create(['email' => $email]);
        return "Success";
    }
}
