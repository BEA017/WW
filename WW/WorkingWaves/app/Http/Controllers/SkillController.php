<?php

namespace App\Http\Controllers;

use App\Models\Driver_license;
use App\Models\Language;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {

        return Skill::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:skills',
        ]);

        $skill = Skill::create($validated);

        return response()->json($skill, 201);
    }

    public function show(Skill $skill)
    {
        return $skill;
    }
    public function getLanguages()
    {
        return Language::all();
    }
    public function getDriverLicenses()
    {
         return Driver_license::all();
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:skills,name,' . $skill->id,
        ]);

        $skill->update($validated);

        return response()->json($skill, 200);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return response()->json(null, 204);
    }
}
