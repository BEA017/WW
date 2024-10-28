<?php

namespace App\Http\Controllers;

use App\Models\JobSeekerRating;
use Illuminate\Http\Request;

class JobSeekerRatingController extends Controller
{
    public function index()
    {
        return JobSeekerRating::with('jobSeeker', 'user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
            'rated_at' => 'required|date',
        ]);

        $jobSeekerRating = JobSeekerRating::create($validated);

        return response()->json($jobSeekerRating, 201);
    }

    public function show(JobSeekerRating $jobSeekerRating)
    {
        return $jobSeekerRating->load('jobSeeker', 'user');
    }

    public function update(Request $request, JobSeekerRating $jobSeekerRating)
    {
        $validated = $request->validate([
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
            'rated_at' => 'required|date',
        ]);

        $jobSeekerRating->update($validated);

        return response()->json($jobSeekerRating, 200);
    }

    public function destroy(JobSeekerRating $jobSeekerRating)
    {
        $jobSeekerRating->delete();

        return response()->json(null, 204);
    }
}
