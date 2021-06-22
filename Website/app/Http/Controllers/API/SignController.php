<?php

namespace App\Http\Controllers\API;

use App\User;
use App\UserMeta;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Support\Facades\Auth;

class SignController extends Controller
{
    //
    public function signUP(Request $request)
    {
//        print $request;

        $type = $request->input("type", "");
        $email = $request->input("email", "");
        $name = $request->input("name", "");
        $password = $request->input("password", "");

        if ($email == "" || $password == "" || $name == "") {// $password can be google_id or facebook_id
            return $this->json_response(1, "Invalid Request");
        }
        if ($type == "0") { // email sign up
            if ($password == "")
                return $this->json_response(1, "Invalid Request");
        } else if ($type == "1") { // google sign up
//            if ($name == "")
//                return $this->json_response(1, "Invalid Request");
        } else if ($type == "2") { // facebook sign up
//            if ($name == "")
//                return $this->json_response(1, "Invalid Request");
        } else {
            return $this->json_response(1, "Invalid Request");
        }

        $find_user = User::where("email", $email)->first();
        if ($find_user) {
            return $this->json_response(2, "User already exists");
        }

        $new_user = User::create([
            "email" => $email,
            "name" => $name,
            "password" => $password
        ]);

        $token = md5($email . $password . date("His"));

        UserMeta::create([
            "user_id" => $new_user->id,
            "user_type" => $type,
            "token" => $token
        ]);

//        Auth::login($new_user);

        $result = array();
        $result["name"] = $new_user->name;
        $result["token"] = $token;

        return $this->json_response(0, $result);
    }

    public function signIN(Request $request)
    {
        //        print $request;
        $type = $request->input("type", "");
        $email = $request->input("email", "");
        $name = $request->input("name", "");
        $password = $request->input("password", "");

        if ($email == "" || $password == "") // $password can be google_id or facebook_id
            return $this->json_response(1, "Invalid Request");
        if ($type == "0") { // email sign up
            if ($password == "")
                return $this->json_response(1, "Invalid Request");
        } else if ($type == "1") { // google sign up
//            if ($name == "")
//                return $this->json_response(1, "Invalid Request");
        } else if ($type == "2") { // facebook sign up
//            if ($name == "")
//                return $this->json_response(1, "Invalid Request");
        } else {
            return $this->json_response(1, "Invalid Request");
        }

        $user = User::where("email", $email)->first();

        if (!$user) {
            return $this->json_response(3, "User does not exists");
        }

        if ($user->password !== $password) {
            return $this->json_response(4, "User authentication is not correct.");
        }

        $token = md5($email . $password . date("His"));

        UserMeta::where("user_id", $user->id)->update(["token" => $token]);

//        Auth::login($new_user);

        $result = array();
        $result["name"] = $user->name;
        $result["token"] = $token;

        return $this->json_response(0, $result);
    }

    public function json_response($code, $content)
    {
        $result = ["code" => $code, "content" => $content];
        return json_encode($result);
    }
}
