<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Employment_type;
use App\Models\location;
use Illuminate\Http\Request;

class EmploymentTypeController extends Controller
{
    public function index()
    {
         $cats=Employment_type::all();
        return response()->json($cats);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|',

        ]);

        $category = Employment_type::create($validated);

        return response()->json($category, 201);
    }

    public function show(Employment_type $category)
    {
        return $category;
    }

    public function update(Request $request, Employment_type $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update($validated);

        return response()->json($category, 200);
    }

    public function destroy(Employment_type $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
