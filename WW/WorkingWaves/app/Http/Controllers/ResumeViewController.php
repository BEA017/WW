<?php

namespace App\Http\Controllers;

use App\Models\ResumeView;
use Illuminate\Http\Request;

class ResumeViewController extends Controller
{
    public function index()
    {

        return ResumeView::with('resume', 'user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'resume_id' => 'required|exists:job_seekers,id',
            'user_id' => 'required|exists:users,id',
            'viewed_at' => 'required|date',
        ]);

        $resumeView = ResumeView::create($validated);

        return response()->json($resumeView, 201);
    }

    public function show(ResumeView $resumeView)
    {
        return $resumeView->load('resume', 'user');
    }

    public function update(Request $request, ResumeView $resumeView)
    {
        $validated = $request->validate([
            'resume_id' => 'required|exists:job_seekers,id',
            'user_id' => 'required|exists:users,id',
            'viewed_at' => 'required|date',
        ]);

        $resumeView->update($validated);

        return response()->json($resumeView, 200);
    }

    public function destroy(ResumeView $resumeView)
    {
        $resumeView->delete();

        return response()->json(null, 204);
    }
}

