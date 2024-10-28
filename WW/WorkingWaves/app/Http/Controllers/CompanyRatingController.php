<?php

namespace App\Http\Controllers;

use App\Models\Company_rating;
use App\Models\CompanyRating;
use Illuminate\Http\Request;

class CompanyRatingController extends Controller
{
    public function index()
    {
        return Company_rating::with('company', 'user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
            'rated_at' => 'required|date',
        ]);

        $companyRating = Company_rating::create($validated);

        return response()->json($companyRating, 201);
    }

    public function show(Company_rating $companyRating)
    {
        return $companyRating->load('company', 'user');
    }

    public function update(Request $request, Company_rating $companyRating)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
            'rated_at' => 'required|date',
        ]);

        $companyRating->update($validated);

        return response()->json($companyRating, 200);
    }

    public function destroy(Company_rating $companyRating)
    {
        $companyRating->delete();

        return response()->json(null, 204);
    }
}
