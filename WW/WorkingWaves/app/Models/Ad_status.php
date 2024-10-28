<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad_status extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
    public function resumes()
    {
        return $this->hasMany(Resume::class);
    }
}
