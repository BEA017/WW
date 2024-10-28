<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function index()
    {
        return Session::with('user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'token' => 'required|string|max:255',
            'expires_at' => 'required|date',
        ]);

        $session = Session::create($validated);

        return response()->json($session, 201);
    }

    public function show(Session $session)
    {
        return $session->load('user');
    }

    public function update(Request $request, Session $session)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'token' => 'required|string|max:255',
            'expires_at' => 'required|date',
        ]);

        $session->update($validated);

        return response()->json($session, 200);
    }

    public function destroy(Session $session)
    {
        $session->delete();

        return response()->json(null, 204);
    }
}
