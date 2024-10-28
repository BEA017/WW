<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver_license extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'job_driver_license');
    }

    public function resume()
    {
        return $this->belongsToMany(Resume::class, 'driver_license_resumes');
    }
}
