<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver_license_Resume extends Model
{
    use HasFactory;

    protected $table = 'driver_license_resume';

    protected $fillable = [
        'resume_id',
        'driver_license_id',
        'driver_experience',
    ];
}
