<?php

namespace App\Http\Controllers\API;

use App\User;
use App\UserMeta;
use App\ImageProcess;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    //
    public function algorithm2(Request $request)
    {
        $token = $request->input("token", "");
        $images = $request->input("image", "");
//        return $token.'__________'.$image;
        if ($token == "" or $images == "")
            return $this->json_response(1, "Invalid Request");
        $userMeta = UserMeta::where("token", $token)->first();
        if (!$userMeta)
            return $this->json_response(5, "Invalid Token");
//        $images = json_decode($image);
        $image_name = "";
        if (count($images) != 5) {
            return $this->json_response(7, "Invalid Image Count - " . count($images));
        }
        $result = 0;
        foreach ($images as $key => $image) {
            $image_name = date("YmdHis_") . $userMeta->user_id . "_algo2_" . strval($key) . ".png";
            $image = base64_decode($image);
            file_put_contents("upload/" . $image_name, $image);

            $pwd = getcwd();
            $cmd = "python3 " . $pwd . "/algorithm/algo.py 2 " . $pwd . "/upload/" . $image_name;
            $last_line = exec($cmd, $output, $retval);
            if ($retval != 0) {
                return $this->json_response(6, "Image Processing Error");
            }
            $result = $result + floatval($last_line);
        }
        $result = $result / 5;

        $this->addProcessingResults($userMeta->user_id, 2, strval($result));
        return $this->json_response(0, $result);
    }

    public function algorithm1(Request $request)
    {
        $token = $request->input("token", "");
        $image = $request->input("image", "");
//        return $token.'__________'.$image;
        if ($token == "" or $image == "")
            return $this->json_response(1, "Invalid Request");
        $userMeta = UserMeta::where("token", $token)->first();
        if (!$userMeta)
            return $this->json_response(5, "Invalid Token");
        $image_name = date("YmdHis_") . $userMeta->user_id . "_algo1" . ".png";
        $image = base64_decode($image);
        file_put_contents("upload/" . $image_name, $image);

        $pwd = getcwd();
        $cmd = "python3 " . $pwd . "/algorithm/algo.py 1 " . $pwd . "/upload/" . $image_name;
        $last_line = exec($cmd, $output, $retval);

        if ($retval == 0) {
            $image = base64_decode($last_line);
            if ($image === false) {
                return $this->json_response(6, "Image Processing Error");
            }
            file_put_contents("download/" . $image_name, $image);
            $this->addProcessingResults($userMeta->user_id, 1, $image_name);
            return $this->json_response(0, $image_name);
        } else {
            return $this->json_response(6, "Image Processing Error");
        }
    }

    public function getProcessingResults(Request $request)
    {
        $token = $request->input("token", "");
        $period = $request->input("period", "");
        if ($token == "" or $period == "")
            return $this->json_response(1, "Invalid Request");
        $userMeta = UserMeta::where("token", $token)->first();
        if (!$userMeta)
            return $this->json_response(5, "Invalid Token");
        $query = "";
        if ($period == 0) // weekly
            $query = "SELECT AVG(result) as result, YEAR(created_at) as year, MONTH(created_at) as month, WEEK(created_at) as week, DATE(created_at) as date from image_processes where user_id = ? and algorithm = 2 GROUP BY YEAR(created_at), MONTH(created_at),  WEEK(created_at), DATE(created_at)";
        else if ($period == 1) // monthly
            $query = "SELECT AVG(result) as result, YEAR(created_at) as year, MONTH(created_at) as month, WEEK(created_at) as week from image_processes where user_id = ? and algorithm = 2 GROUP BY YEAR(created_at), MONTH(created_at),  WEEK(created_at)";
        else if ($period == 2) // yearly
            $query = "SELECT AVG(result) as result, YEAR(created_at) as year, MONTH(created_at) as month from image_processes where user_id = ? and algorithm = 2 GROUP BY YEAR(created_at), MONTH(created_at)";
        else
            return $this->json_response(8, "Invalid Period");
        $results = DB::select($query, [$userMeta->user_id]);
        return $this->json_response(0, $results);
    }

    public function addProcessingResults($userId, $algo, $result)
    {
        ImageProcess::create(["user_id" => $userId, "algorithm" => $algo, "result" => $result]);
    }

    public function json_response($code, $content)
    {
        $result = ["code" => $code, "content" => $content];
        return json_encode($result);
    }
}
