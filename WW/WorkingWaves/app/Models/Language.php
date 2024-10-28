<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'job_languages');
    }

    public function resume()
    {
        return $this->belongsToMany(Resume::class, 'resume_languages');
    }
}
