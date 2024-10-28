<?php
namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    public function index()
    {
        return Company::with('user')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
        ]);

        $company = Company::create($validated);

        return response()->json($company, 201);
    }

    public function show(Company $company)
    {
        try {
            // Проверка, что компания найдена
            $company = Company::with(['jobs' => function($query) {
                $query->where('ad_status', 1);
            }, 'ratings', 'user'])->find($company->id);
            if (!$company) {
                Log::error('Company not found');
                return response()->json(['error' => 'Company not found'], 404);
            }

            // Возвращаем данные компании
            return response()->json($company);
        } catch (\Exception $e) {
            Log::error('Error fetching company:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function update(Request $request, Company $company)
    {
        Log::info('Updating company', ['company' => $company, 'request' => $request->all()]);
         try{
             $validated = $request->validate([
             //'user_id' => 'required|exists:users,id',
             'name' => 'required|string|max:255',
             'description' => 'nullable|string',
             //  'logo' => 'nullable|string|max:255',
             'user_name' => 'nullable|string|max:255',
             'website' => 'nullable|string|max:255',
         ]);

             //смена имени пользователя

             DB::table('users')->where('id', $company->user_id)->update([
                 'name' => $request->user_name,
             ]);

            // Обработка файла изображения
             if (!empty($request->logo)) {
                if ($request->hasFile('logo')) {
                    // Удаляем старый файл, если существует
                    if ($company->logo && file_exists(public_path('images/logos/' . $company->logo))) {
                        unlink(public_path('images/logos/' . $company->logo));
                    }

                    // Сохраняем новый файл
                    $avatar = $request->file('logo');
                    $avatarName = time() . '_' . $avatar->getClientOriginalName();
                    $avatar->move(public_path('images/logos'), $avatarName);
                    $validated['logo'] = $avatarName;
                } else {
                    // Если нового файла нет, оставляем старое изображение
                    $validated['logo'] = $company->logo;
                }
            }
            $company->update($validated);

            return response()->json($company, 200);
        }catch (\Exception $e) {
            Log::error('Error fetching company:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }

    }
/*public function update(Request $request, $id)
    {
        // Валидация входящих данных
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|url',
            'website' => 'nullable|url',
        ]);

        // Поиск компании
        $company = Company::findOrFail($id);

        // Обновление данных компании
        $company->update($validatedData);

        // Возвращаем ответ с обновленными данными
        return response()->json($company);
    }*/
    public function destroy(Company $company)
    {
        $company->delete();

        return response()->json(null, 204);
    }
}
