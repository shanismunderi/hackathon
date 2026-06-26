<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Manuscript extends Model
{
    protected $fillable = [
        'title',
        'author',
        'period',
        'description'
    ];
}
