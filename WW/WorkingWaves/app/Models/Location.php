<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_locations_id',
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
