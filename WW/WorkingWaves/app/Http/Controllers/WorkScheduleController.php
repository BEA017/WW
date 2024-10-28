<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\location;
use App\Models\Work_schedule;
use Illuminate\Http\Request;

class WorkScheduleController extends Controller
{
    public function index()
    {
        $cats=Work_schedule::all();
        return response()->json($cats);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',

        ]);

        $category = Work_schedule::create($validated);

        return response()->json($category, 201);
    }

    public function show(Work_schedule $category)
    {
        return $category;
    }

    public function update(Request $request, Work_schedule $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update($validated);

        return response()->json($category, 200);
    }

    public function destroy(Work_schedule $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
