<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'resume_name',
        'avatar',
        'category_id',//специализация
        'email',
        'phone',
        'location_id',
        'desired_salary',
        'experience',
        'education',
        'about_me',
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

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    public function work_schedule()
    {
        return $this->belongsTo(Work_schedule::class);
    }

    public function employment_type()
    {
        return $this->belongsTo(Employment_type::class);
    }

    public function driving_licence()
    {
        return $this->belongsTo(Driver_license::class);
    }



    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'resume_skills');
    }
    public function languages()
    {
        return $this->belongsToMany(Language::class, 'resume_languages');
    }
    public function scopeFilter($query, array $filters)
    {
        if (isset($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }

        if (isset($filters['location'])) {
            $query->where('location', 'like', '%' . $filters['location'] . '%');
        }

        if (isset($filters['desired_salary'])) {
            $query->where('desired_salary', '>=', $filters['desired_salary']);
        }

        if (isset($filters['skills'])) {
            $query->where('skills', 'like', '%' . $filters['skills'] . '%');
        }

        if (isset($filters['experience'])) {
            $query->where('experience', '>=', $filters['experience']);
        }

        if (isset($filters['education'])) {
            $query->where('education', 'like', '%' . $filters['education'] . '%');
        }
    }


    public function views()
    {
        return $this->hasMany(Resume_view::class);
    }
}
