<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
    //
//    public $timestamps = false;

    protected $fillable = [
        'user_id', 'user_type', 'token',
    ];

}
