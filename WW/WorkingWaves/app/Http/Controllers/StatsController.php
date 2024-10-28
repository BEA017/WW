<?php

namespace App\Http\Controllers;
use App\Models\Job;
use App\Models\Resume;
use App\Models\User;

use Illuminate\Http\Request;

class StatsController extends Controller
{
  

    public function getEmployerCount()
    {
        $EmployerCount = User::where('role', 'employer')         
        ->get();

        return response()->json($EmployerCount);
    }

    public function getSeekerCount()
    {
        $SeekerCount = User::where('role', 'job_seeker')         
        ->get();

        return response()->json($SeekerCount);
    }

    public function getActiveJobCount()
    {
        $ActiveJob = Job::where('ad_status', '1')         
        ->get();

        return response()->json($ActiveJob);
    }
     
    public function getActiveResumeCount()
    {
        $ActiveResume = Resume::where('ad_status', '1')         
        ->get();

        return response()->json($ActiveResume);
    }
     
    public function getJobToCheckCount()
    {
        $JobTC = Job::where('ad_status', '2')         
        ->get();

        return response()->json($JobTC);
    }
     
    public function getResumeToCheckCount()
    {
        $ResumeTC = Resume::where('ad_status', '2')         
        ->get();

        return response()->json($ResumeTC);
    }
}
