<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Languages_Job extends Model
{
    use HasFactory;

    protected $table = 'languages_jobs';

    protected $fillable = [
        'job_id',
        'language_id',
        'language_level',
    ];
}
