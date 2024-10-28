<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Job;
use App\Models\Resume;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    // Управление пользователями
    public function getUsers(Request $request)
    {
        try {
            $users = User::query();
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query'));
                $users->whereRaw('LOWER(name) like ?', ['%' . $searchQuery . '%'])
                    ->orWhereRaw('LOWER(email) like ?', ['%' . $searchQuery . '%'])
                    ->orWhereRaw('LOWER(role) like ?', ['%' . $searchQuery . '%']);
            }
            $users = $users->paginate(10);
            return response()->json(['users' => $users]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения списка пользователей'], 500);
        }
    }

    public function getUser($id)
    {
        // Загрузка пользователя с привязанной компанией, если она есть
        $user = User::with('company')->find($id);

        // Проверка, существует ли пользователь
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json([
            'user' => $user,
            'company' => $user->company // Компания привязана через отношение в модели User
        ]);
    }

    // Удаление пользователя
    public function makeModer($id)
    {

        try {
            $user = User::findOrFail($id);
            $user->role ="moder";
            $user->save();

            return response()->json(['message' => 'Пользователь теперь модератор']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка удаления пользователя'], 500);
        }
    }
    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            // Удаление компании пользователя
            $company = Company::where('user_id', $user->id)->first();
            if ($company) {
                // Удаление всех объявлений, связанных с этой компанией
                Job::where('company_id', $company->id)->delete();

                // Удаление компании
                $company->delete();
            }
            //удаление резюме
            Resume::where("user_id", $user->id)->delete();

            return response()->json(['message' => 'Пользователь удален']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка удаления пользователя'], 500);
        }
    }
    // Управление категориями
    public function getCategories(Request $request)
    {
        try {
            $categories = Category::query();
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query'));
                $categories->whereRaw('LOWER(name) like ?', ['%' . $searchQuery . '%']);
            }
            $categories = $categories->paginate(10);
            return response()->json(['categories' => $categories]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения категорий'], 500);
        }
    }

    // Добавление новой категории
    public function createCategory(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        try {
            $category = Category::create(['name' => $validated['name']]);
            return response()->json(['category' => $category], 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка создания категории'], 500);
        }
    }

    public function deleteCategory($id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return response()->json(['message' => 'удален']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка удаления'], 500);
        }
    }
     public function getLocations(Request $request)
    {
        try {
            $locations = Location::query();
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query'));
                $locations->whereRaw('LOWER(name) like ?', ['%' . $searchQuery . '%']);
            }
            $locations = $locations->paginate(10);
            return response()->json(['locations' => $locations]);

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения объявлений'], 500);
        }
    }
    public function createLocation(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        try {
            $category = Location::create(['name' => $validated['name']]);
            return response()->json(['category' => $category], 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка создания локации'], 500);
        }
    }

    public function deleteLocation($id)
    {
        try {
            $location = Location::findOrFail($id);
            $location->delete();
            return response()->json(['message' => 'удален']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка удаления '], 500);
        }
    }
    // Просмотр статистики
    public function getStats()
    {
        try {
            $userCount = User::where('role', 'employer')->count();
            $companyCount = User::where('role', 'job_seeker')->count();
            $ajobCount = Job::where('ad_status', '1')->count();
            $aresumeCount = Resume::where('ad_status', '1')->count();
            $tcjobCount = Job::where('ad_status', '2')->count();
            $tcresumeCount = Resume::where('ad_status', '2')->count();
        
            return response()->json([
                'userCount' => $userCount,
                'companyCount' => $companyCount,
                'ajobCount' => $ajobCount,
                'tcjobCount' => $tcjobCount,
                'aresumeCount' => $aresumeCount,
                'tcresumeCount' => $tcresumeCount                 
            ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения статистики'], 500);
        }
        
    }
}
