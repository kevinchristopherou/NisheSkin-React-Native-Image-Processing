<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'name', 'url', 'type1', 'type2', 'type3', 'brand', 'popular', 'fashion', 'desc'
    ];
}
