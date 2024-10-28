<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Languages_Resume extends Model
{
    use HasFactory;

    protected $table = 'languages_resume';

    protected $fillable = [
        'job_id',
        'resume_id',
        'language_level',

    ];
}
