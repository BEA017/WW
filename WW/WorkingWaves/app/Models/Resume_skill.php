<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume_skill extends Model
{
    use HasFactory;
    public $timestamps = false; // Отключает автоматическое управление временными метками

    protected $table = 'resume_skills';

    protected $fillable = [
        'resume_id',
        'skill_id',
    ];
}
