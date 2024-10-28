<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LocationController extends Controller
{
    public function index()
    {
        try{
            $location=Location::all();

            return response()->json($location);
        }catch (\Exception $e){
            Log::error($e->getMessage());
            return response()->json('Server error fetching location data', 500);
        }

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',

        ]);

        $category = Location::create($validated);

        return response()->json($category, 201);
    }

    public function show(Location $category)
    {
        return $category;
    }

    public function update(Request $request, Location $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update($validated);

        return response()->json($category, 200);
    }

    public function destroy(Location $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
