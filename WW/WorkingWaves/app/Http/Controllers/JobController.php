<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Job_skill;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class JobController extends Controller
{

    public function index(Request $request)
    {
        try {
//            Log::info('Incoming request:', $request->all());

            $jobs = Job::query();

            //Отфильтровать только со статусом "Активно"
            $jobs->where('ad_status', 1);

            // Поиск по заголовку или описанию
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query')); // Приведение запроса к нижнему регистру
                $jobs->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(title) like ?', ['%' . $searchQuery . '%']) // Приведение заголовка к нижнему регистру
                    ->orWhereRaw('LOWER(description) like ?', ['%' . $searchQuery . '%']); // Приведение описания к нижнему регистру
                });
            }

            // Фильтрация по категории
            if ($request->filled('category')) {
                $jobs->where('category_id', $request->category);
            }

            // Фильтрация по локации
            if ($request->filled('location')) {
                $jobs->where('location_id', $request->location);
            }

// Фильтрация по зарплате
            if ($request->filled('salaryRange')) {
                $salaryRange = explode('-', $request->salaryRange);

                // Проверка корректности диапазона
                if (count($salaryRange) === 2 && is_numeric($salaryRange[0]) && is_numeric($salaryRange[1])) {
                    $jobs->whereBetween('salary', [trim($salaryRange[0]), trim($salaryRange[1])]);
                } elseif ( is_numeric($salaryRange[0])) {
                    // Если передано только первое число (перед "-", например "100-")
                    $jobs->where('salary', '>=', trim($salaryRange[0]));
                } elseif ( is_numeric($salaryRange[1])) {
                    // Если передано только второе число (после "-", например "-500")
                    $jobs->where('salary', '<=', trim($salaryRange[0]));
                }
            }

            // Фильтрация по типу занятости
            if ($request->filled('employmentType')) {
                $jobs->where('employment_type_id', $request->employmentType);
            }
            // Фильтрация по графику работы
            if ($request->filled('workSchedule')) {
                $jobs->where('work_schedule_id', $request->workSchedule);
            }

            // Сортировка
            if ($request->filled('sort')) {
                $sortField = $request->sort;
                $sortDirection = 'asc'; // Задай порядок сортировки, по умолчанию 'asc'

                if (str_starts_with($sortField, '-')) {
                    $sortDirection = 'desc';
                    $sortField = ltrim($sortField, '-');
                }

                $jobs->orderBy($sortField, $sortDirection);
            }

            // Пагинация
            $perPage = 10; // Количество вакансий на страницу
            $jobs = $jobs->with('location', 'company', 'category', 'work_schedule', 'employment_type')->paginate($perPage);
           // dd(response()->json($jobs));
            return response()->json($jobs);
        } catch (\Exception $e) {
            Log::error('Error fetching jobs:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function getPersonalJobs(Request $request)
    {
        
        try {
           
            $user = auth()->user();

            // Получаем компанию, связанную с пользователем
            $company = $user->company;

            if (!$company) {
                return response()->json(['error' => 'User does not have a company'], 404);
            }

            $adStatus = $request->input('ad_status', 1); // По умолчанию показываем только активные объявления
            $searchQuery = strtolower($request->input('search', ''));

            // Запрос вакансий компании с фильтрацией по статусу объявления
            $query = $company->jobs()->where('ad_status', $adStatus);

            // Добавляем условие поиска, если оно есть
            if (!empty($searchQuery)) {
                $query->where(function($q) use ($searchQuery) {
                    $q->whereRaw('LOWER(title) like ?', ['%' . $searchQuery . '%'])
                        ->orWhereRaw('LOWER(description) like ?', ['%' . $searchQuery . '%']);
                });
            }

            // Пагинация
//            $jobs = $query->with(['category', 'location', 'company'])->paginate(10);
            $jobs = $query->with(['category', 'location'])->paginate(10);

            // Возвращаем данные с именем компании
            $data = [
                'company_id' => $company->id, // Используем имя компании
                'company_name' => $company->name, // Используем имя компании
                'company_logo' => $company->logo, // Используем logo компании
                'jobs' => $jobs
            ];
           //Log::info("data", $data);
             return response()->json($data);
        } catch (\Exception $e) {
            Log::error('Error fetching jobs:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function store(Request $request)
    {
        $companyId = Auth::user()->company->id; // Получаем компанию текущего пользователя
        //Log::info($request);
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required|string|max:2000',
                'requirements_education' => 'nullable|string|max:2000',
                'requirements_experience' => 'nullable|string|max:2000',
                'salary' => 'nullable',
                'contact_phone' => 'required|string|max:15',
                'contact_email' => 'required|email|max:255',
                'location_id' => 'required|exists:locations,id',
                'work_schedule_id' => 'nullable|exists:work_schedules,id',
                'employment_type_id' => 'nullable|exists:employment_types,id',
            ]);

            // Добавляем идентификатор компании и статус объявления
            $validatedData['company_id'] = $companyId;
            $validatedData['ad_status'] = 2; // По умолчанию статус "на модерации"

            // Сохранение вакансии
            $job = Job::create($validatedData);

            // Обработка навыков
            if (!empty($request->skills)) {
                $skillsArr = json_decode($request->skills, true);
                if (is_array($skillsArr)) {
                    foreach ($skillsArr as $skill) {
                        $sk = Skill::firstOrCreate(['name' => $skill]);
                        $skId = $sk->id;

                        $job->skills()->attach($skId);
                    }
                } else {
                    Log::error('Skills data is not an array');
                }
            }

            return response()->json(['message' => 'Вакансия успешно создана', 'job' => $job]);

        } catch (\Exception $e) {
            Log::error('Error saving job:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }


    public function show(Job $job)
    {
        //dd($job->load('company', 'category', 'location','skills', 'work_schedule', 'employment_type'));
        return $job->load('company', 'category', 'location','skills', 'work_schedule', 'employment_type');

    }
    /*  // Загружаем связи вместе с основной моделью
        $jobWithDetails = $job->load([
            'company:id,name', // Подгружаем компанию и выбираем только поле name
            'category:id,name', // Подгружаем категорию и выбираем только поле name
            'location:id,name', // Подгружаем локацию и выбираем только поле name
            'skills', // Предположим, что здесь нет необходимости выбирать конкретные поля
            'description',
            'salary',
            'employment_type'
        ]);
        return response()->json($jobWithDetails);*/
    public function relatedJobs(Job $job)
    {
            $relatedJobs = Job::where('category_id', $job->category_id)
                ->where('id', '!=', $job->id)
                ->take(5)
                ->get();

            return response()->json($relatedJobs);
    }
    // Обрабатывает отклики на вакансию запись в applications?
    public function apply(Request $request, Job $job)
    {
//        $validated = $request->validate([
//            'fullName' => 'required|string|max:255',
//            'email' => 'required|email',
//            'phone' => 'required|string',
//            'coverLetter' => 'nullable|string',
//        ]);
//
//        // Логика сохранения заявки
//        $application = $job->applications()->create($validated);
//
//        return response()->json(['message' => 'Application submitted successfully']);
    }
    public function update(Request $request, $id)
    {
        $companyId = Auth::user()->company->id; // Получаем компанию текущего пользователя
       // Log::info($request);

        try {
            // Поиск вакансии
            $job = Job::where('company_id', $companyId)->findOrFail($id);

            // Валидация входных данных
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required|string|max:2000',
                'requirements_education' => 'nullable|string|max:2000',
                'requirements_experience' => 'nullable|string|max:2000',
                'salary' => 'nullable',
                'contact_phone' => 'required|string|max:15',
                'contact_email' => 'required|email|max:255',
                'location_id' => 'required|exists:locations,id',
                'work_schedule_id' => 'nullable|exists:work_schedules,id',
                'employment_type_id' => 'nullable|exists:employment_types,id',
                'ad_status' => 'nullable|numeric',

            ]);

            // Обновление данных вакансии
            $job->update($validatedData);

            // Обновляем навыки (удаляем старые и добавляем новые)
            if (!empty($request->skills)) {
                $skillsArr = json_decode($request->skills, true);

                if (is_array($skillsArr)) {
                    // Удаляем все старые связи между вакансией и навыками
                    Job_skill::where('job_id', $job->id)->delete();

                    // Привязываем новые навыки
                    foreach ($skillsArr as $skill) {
                        // Ищем навык или создаем его
                        $sk = Skill::firstOrCreate(['name' => $skill['name']]);

                        // Добавляем запись в промежуточную таблицу job_skill
                        Job_skill::firstOrCreate([
                            'job_id' => $job->id,
                            'skill_id' => $sk->id,
                        ]);
                    }
                } else {
                    Log::error('Skills data is not an array');
                }
            }


            return response()->json(['message' => 'Вакансия успешно обновлена', 'job' => $job]);

        } catch (\Exception $e) {
            Log::error('Error updating job:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }


    public function destroy($id)
    {
        try {
            // Находим резюме по ID и проверяем, что оно принадлежит текущему пользователю
            $resume = Job::where('id', $id);
            $resume->delete();

            return response()->json(null, 204);}
        catch (\Exception $e) {
            Log::error('Error deleting resume:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }
}
