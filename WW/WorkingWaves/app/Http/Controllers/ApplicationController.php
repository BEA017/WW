<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        return Application::with('job', 'jobSeeker')->get();

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'cover_letter' => 'nullable|string',
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $application = Application::create($validated);

        return response()->json($application, 201);
    }

    public function show(Application $application)
    {
        return $application->load('job', 'jobSeeker');
    }

    public function update(Request $request, Application $application)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'cover_letter' => 'nullable|string',
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $application->update($validated);

        return response()->json($application, 200);
    }

    public function destroy(Application $application)
    {
        $application->delete();

        return response()->json(null, 204);
    }
}
