<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'category_id',
        'title',
        'description',
        'requirements_education',
        'requirements_experience',
        'salary',
        'contact_phone',
        'contact_email',
        'location_id',
        'work_schedule_id',
        'employment_type_id',
        'published_at',
        'ad_status',
    ];

    public function ad_status()
    {
        return $this->belongsTo(Ad_status::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function work_schedule()
    {
        return $this->belongsTo(Work_schedule::class);
    }

    public function employment_type()
    {
        return $this->belongsTo(Employment_type::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'job_skills');
    }
    public function driving_licence()
    {
        return $this->belongsTo(Driver_license::class);
    }
    public function languages()
    {
        return $this->belongsToMany(Language::class, 'job_languages');
    }

    public function views()
    {
        return $this->hasMany(Job_view::class);
    }
}
