<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {

        return Chat::with('job',
            'jobSeeker',
            'company',
            'messages')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $chat = Chat::create($validated);

        return response()->json($chat, 201);
    }

    public function show(Chat $chat)
    {
        return $chat->load('job', 'jobSeeker', 'company', 'messages');
    }

    public function update(Request $request, Chat $chat)
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'job_seeker_id' => 'required|exists:job_seekers,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $chat->update($validated);

        return response()->json($chat, 200);
    }

    public function destroy(Chat $chat)
    {
        $chat->delete();

        return response()->json(null, 204);
    }
}
