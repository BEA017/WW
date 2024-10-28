<?php
namespace App\Http\Controllers;

use App\Models\Driver_license;
use App\Models\Resume;
use App\Models\Resume_skill;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ResumeController extends Controller
{
    public function index(Request $request)
    {
        try {
//            Log::info('Incoming request:', $request->all());

            $resume = Resume::query();
            //Отфильтровать только со статусом "Активно"
            $resume->where('ad_status', 1);

            // Поиск по заголовку или описанию

            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query')); // Приведение запроса к нижнему регистру
                $resume->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(resume_name) like ?', ['%' . $searchQuery . '%']) // Приведение заголовка к нижнему регистру
                    ->orWhereRaw('LOWER(about_me) like ?', ['%' . $searchQuery . '%']); // Приведение описания к нижнему регистру
                });
            }

            // Фильтрация по категории
            if ($request->filled('category')) {
                $resume->where('category_id', $request->category);
            }

            // Фильтрация по локации
            if ($request->filled('location')) {
                $resume->where('location_id', $request->location);
            }

// Фильтрация по зарплате
            if ($request->filled('salaryRange')) {
                $salaryRange = explode('-', $request->salaryRange);

                // Проверка корректности диапазона
                if (count($salaryRange) === 2 && is_numeric($salaryRange[0]) && is_numeric($salaryRange[1])) {
                    $resume->whereBetween('desired_salary', [trim($salaryRange[0]), trim($salaryRange[1])]);
                } elseif ( is_numeric($salaryRange[0])) {
                    // Если передано только первое число (перед "-", например "100-")
                    $resume->where('desired_salary', '>=', trim($salaryRange[0]));
                } elseif ( is_numeric($salaryRange[1])) {
                    // Если передано только второе число (после "-", например "-500")
                    $resume->where('desired_salary', '<=', trim($salaryRange[0]));
                }
            }



            // Сортировка
            if ($request->filled('sort')) {
                $sortField = $request->sort;
                $sortDirection = 'asc'; // Задай порядок сортировки, по умолчанию 'asc'

                if (str_starts_with($sortField, '-')) {
                    $sortDirection = 'desc';
                    $sortField = ltrim($sortField, '-');
                }

                $resume->orderBy($sortField, $sortDirection);
            }

            // Пагинация
            $perPage = 10; // Количество вакансий на страницу
            $resume = $resume->with('user', 'category', 'location')->paginate($perPage);
           // dd(response()->json($resume));
            return response()->json($resume);
        } catch (\Exception $e) {
            //dd($e->getMessage());
            Log::error('Error fetching jobs:', ['error' => $e->getMessage()]);

            return response()->json(['error' => 'Server Error'], 500);
        }
    }
    public function getPersonalResumes(Request $request)
    {
        try {
            $user = auth()->user();
            Log::info( $user);

            $adStatus = $request->input('ad_status');
            $searchQuery = strtolower($request->input('search'));

            // Запрос с фильтрацией по статусу объявления
            $query = $user->resumes()->where('ad_status', $adStatus);

            // Добавляем условие поиска, если оно есть
            if (!empty($searchQuery)) {
                $query->where(function($q) use ($searchQuery) {
                    $q->whereRaw('LOWER(resume_name) like ?', ['%' . $searchQuery . '%'])
                        ->orWhereRaw('LOWER(about_me) like ?', ['%' . $searchQuery . '%']);
                });
            }

            // Пагинация
            $resumes = $query->with(['user', 'category', 'location'])->paginate(10);

            // Возвращаем данные с именем пользователя
            $data = [

                'avatar' => $user->avatar, // Используем имя пользователя
                'user_id' => $user->id, // Используем имя пользователя
                'user_name' => $user->name, // Используем имя пользователя
                'resumes' => $resumes
            ];

            return response()->json($data);
        } catch (\Exception $e) {
            Log::error('Error fetching resumes:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function getResumes(Request $request)
    {
        try {
            $userId = Auth::id();
            $resume = Resume::query();

            // Фильтруем резюме по user_id
            $resume->where('user_id', $userId);

            // Другие фильтры, как в вашем коде
            $resume->where('ad_status', 1);

            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query'));
                $resume->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(resume_name) like ?', ['%' . $searchQuery . '%'])
                        ->orWhereRaw('LOWER(about_me) like ?', ['%' . $searchQuery . '%']);
                });
            }

            // Фильтрация по категории
            if ($request->filled('category')) {
                $resume->where('category_id', $request->category);
            }

            // Фильтрация по локации
            if ($request->filled('location')) {
                $resume->where('location_id', $request->location);
            }

            // Фильтрация по зарплате
            if ($request->filled('salaryRange')) {
                $salaryRange = explode('-', $request->salaryRange);
                if (count($salaryRange) === 2 && is_numeric($salaryRange[0]) && is_numeric($salaryRange[1])) {
                    $resume->whereBetween('desired_salary', [trim($salaryRange[0]), trim($salaryRange[1])]);
                } elseif (is_numeric($salaryRange[0])) {
                    $resume->where('desired_salary', '>=', trim($salaryRange[0]));
                } elseif (is_numeric($salaryRange[1])) {
                    $resume->where('desired_salary', '<=', trim($salaryRange[0]));
                }
            }

            // Сортировка
            if ($request->filled('sort')) {
                $sortField = $request->sort;
                $sortDirection = 'asc';
                if (str_starts_with($sortField, '-')) {
                    $sortDirection = 'desc';
                    $sortField = ltrim($sortField, '-');
                }
                $resume->orderBy($sortField, $sortDirection);
            }

            // Пагинация
            $perPage = 10;
            $resume = $resume->with('user', 'category', 'location')->paginate($perPage);

            return response()->json($resume);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function store(Request $request)
    {
        $userId = Auth::id();

        try {
            $validatedData = $request->validate([
                'resume_name' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:15',
                'location_id' => 'required|exists:locations,id',
                'desired_salary' => 'nullable',
                'experience' => 'nullable|string|max:1000',
                'education' => 'nullable|string|max:1000',
                'about_me' => 'nullable|string|max:1000',
//                'avatar' => 'nullable', // Параметры для изображения
            ]);

            // Добавляем идентификатор пользователя
            $validatedData['user_id'] = $userId;
            $validatedData['ad_status'] = 2;

            // Обработка файла изображения
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $avatarName = time() . '_' . $avatar->getClientOriginalName();
                $avatar->move(public_path('images/avatars'), $avatarName);
                $validatedData['avatar'] = $avatarName;
            }

            // Сохранение основного резюме
            $resume = Resume::create($validatedData);

            if (!empty($request->skills)) {
                $skillsArr = json_decode($request->skills, true);
                if (is_array($skillsArr)) {
                    $resumeId = $resume->id;
                    foreach ($skillsArr as $skill) {
                        $sk = Skill::firstOrCreate(['name' => $skill]);
                        $skId = $sk->id;

                        Resume_skill::firstOrCreate([
                            'resume_id' => $resumeId,
                            'skill_id' => $skId
                        ]);
                    }
                } else {
                    Log::error('Skills data is not an array');
                }
            }

            return response()->json(['message' => 'Резюме успешно создано', 'resume' => $resume]);

        } catch (\Exception $e) {
            Log::error('Error saving resume:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }


    public function show(Request $request, $id)
    {
//        $user = auth()->user();
//        Log::info( $user);
        $resume = Resume::with(['user', 'category', 'location','skills', 'work_schedule', 'employment_type'])->find($id);
//        dd($resume);
        return response()->json($resume, 201);
    }


    public function update(Request $request, $id)
    {
        $userId = Auth::id();

        try {
            // Находим резюме по ID и проверяем, что оно принадлежит текущему пользователю
            $resume = Resume::where('id', $id)->where('user_id', $userId)->firstOrFail();
//            Log::info('Incoming request:', $request->all());
            // Валидация данных
            $validatedData = $request->validate([
                'resume_name' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:15',
                'location_id' => 'required|exists:locations,id',
                'desired_salary' => 'nullable|numeric',
                'experience' => 'nullable|string|max:1000',
                'education' => 'nullable|string|max:1000',
                'about_me' => 'nullable|string|max:1000',
                'ad_status' => 'nullable|numeric',
                //'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Параметры для изображения
            ]);

            // Обработка файла изображения
            if (!empty($request->avatar)) {
                if ($request->hasFile('avatar')) {
                    // Удаляем старый файл, если существует
                    if ($resume->avatar && file_exists(public_path('images/avatars/' . $resume->avatar))) {
                        unlink(public_path('images/avatars/' . $resume->avatar));
                    }

                    // Сохраняем новый файл
                    $avatar = $request->file('avatar');
                    $avatarName = time() . '_' . $avatar->getClientOriginalName();
                    $avatar->move(public_path('images/avatars'), $avatarName);
                    $validatedData['avatar'] = $avatarName;
                } else {
                    // Если нового файла нет, оставляем старое изображение
                    $validatedData['avatar'] = $resume->avatar;
                }
            }

            // Обновляем основное резюме
            $resume->update($validatedData);

            // Обновляем навыки (удаляем старые и добавляем новые)
            if (!empty($request->skills)) {
                $skillsArr = json_decode($request->skills, true);
//                Log::error($skillsArr);

                if (is_array($skillsArr)) {
                    // Удаляем все старые связи между резюме и навыками
                    Resume_skill::where('resume_id', $resume->id)->delete();

                    // Привязываем новые навыки
                    foreach ($skillsArr as $skill) {
                        // Ищем навык или создаем его
                        $sk = Skill::firstOrCreate(['name' => $skill['name']]);
//                        Log::error($sk);

                        // Добавляем запись в промежуточную таблицу resume_skill
                        Resume_skill::firstOrCreate([
                            'resume_id' => $resume->id,
                            'skill_id' => $sk->id,
                        ]);
                    }
                } else {
                    Log::error('Skills data is not an array');
                }
            }

            return response()->json(['message' => 'Резюме успешно обновлено', 'resume' => $resume]);

        } catch (\Exception $e) {
            Log::error('Error updating resume:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function destroy($id)
    {
        $userId = Auth::id();

        try {
            // Находим резюме по ID и проверяем, что оно принадлежит текущему пользователю
            $resume = Resume::where('id', $id);
            $resume->delete();

            return response()->json(null, 204);}
        catch (\Exception $e) {
            Log::error('Error deleting resume:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }
}
