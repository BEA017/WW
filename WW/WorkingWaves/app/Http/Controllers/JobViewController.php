<?php

namespace App\Http\Controllers;

use App\Models\JobView;
use Illuminate\Http\Request;

class JobViewController extends Controller
{
    public function index()
    {
        return JobView::with('job', 'user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'user_id' => 'required|exists:users,id',
            'viewed_at' => 'required|date',
        ]);

        $jobView = JobView::create($validated);

        return response()->json($jobView, 201);
    }

    public function show(JobView $jobView)
    {
        return $jobView->load('job', 'user');
    }

    public function update(Request $request, JobView $jobView)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'user_id' => 'required|exists:users,id',
            'viewed_at' => 'required|date',
        ]);

        $jobView->update($validated);

        return response()->json($jobView, 200);
    }

    public function destroy(JobView $jobView)
    {
        $jobView->delete();

        return response()->json(null, 204);
    }
}
