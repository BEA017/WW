<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {

        return Message::with('chat', 'sender')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'sender_id' => 'required|exists:users,id',
            'sender_type' => 'required|in:App\Models\JobSeeker,App\Models\Company',
            'content' => 'required|string',
        ]);

        $message = Message::create($validated);

        return response()->json($message, 201);
    }

    public function show(Message $message)
    {
        return $message->load('chat', 'sender');
    }

    public function update(Request $request, Message $message)
    {
        $validated = $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'sender_id' => 'required|exists:users,id',
            'sender_type' => 'required|in:App\Models\JobSeeker,App\Models\Company',
            'content' => 'required|string',
        ]);

        $message->update($validated);

        return response()->json($message, 200);
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return response()->json(null, 204);
    }
}
