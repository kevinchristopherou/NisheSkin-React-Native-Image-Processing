<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImageProcess extends Model
{
    //
    protected $fillable = [
        'user_id', 'algorithm', 'result',
    ];
}
