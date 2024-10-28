<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;
    public $timestamps = false; // Отключает автоматическое управление временными метками

    protected $fillable = [
        'name',
    ];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'job_skills');
    }

    public function resumes()
    {
        return $this->belongsToMany(Resume::class, 'job_seeker_skills');
    }
}
