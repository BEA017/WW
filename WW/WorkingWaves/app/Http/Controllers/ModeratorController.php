<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Resume;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ModeratorController extends Controller
{
    // Получение непроверенных вакансий
    public function getUnverifiedJobs(Request $request)
    {
        try {
            $jobs = Job::where('ad_status', 2) ;
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query')); // Приведение запроса к нижнему регистру
                $jobs->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(title) like ?', ['%' . $searchQuery . '%']) // Приведение заголовка к нижнему регистру
                    ->orWhereRaw('LOWER(description) like ?', ['%' . $searchQuery . '%']); // Приведение описания к нижнему регистру
                });
            }
            $jobs = $jobs->with('company')->paginate(10);

            return response()->json(['jobs' => $jobs]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения активных вакансий'], 500);
        }
    }

    // Получение непроверенных резюме
    public function getUnverifiedResumes(Request $request)
    {
        try {
            $resumes = Resume::where('ad_status', 2);
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query')); // Приведение запроса к нижнему регистру
                $resumes->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(resume_name) like ?', ['%' . $searchQuery . '%']) // Приведение заголовка к нижнему регистру
                    ->orWhereRaw('LOWER(about_me) like ?', ['%' . $searchQuery . '%']); // Приведение описания к нижнему регистру
                });
            }
            $resumes = $resumes->with('user')->paginate(10);

            return response()->json(['resumes' => $resumes]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения резюме'], 500);
        }
    }

    // Получение активных вакансий
    public function getActiveJobs(Request $request)
    {
        try {
            $jobs = Job::where('ad_status', 1);
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query')); // Приведение запроса к нижнему регистру
                $jobs->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(title) like ?', ['%' . $searchQuery . '%']) // Приведение заголовка к нижнему регистру
                    ->orWhereRaw('LOWER(description) like ?', ['%' . $searchQuery . '%']); // Приведение описания к нижнему регистру
                });
            }
            $jobs = $jobs->with('company')->paginate(10);
            return response()->json(['jobs' => $jobs]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения активных вакансий'], 500);
        }
    }
    // Получение активных резюме
    public function getActiveResumes(Request $request)
    {
        try {
            $resumes = Resume::where('ad_status', 1);
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query')); // Приведение запроса к нижнему регистру
                $resumes->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(resume_name) like ?', ['%' . $searchQuery . '%']) // Приведение заголовка к нижнему регистру
                    ->orWhereRaw('LOWER(about_me) like ?', ['%' . $searchQuery . '%']); // Приведение описания к нижнему регистру
                });
            }
            $resumes = $resumes->with('user')->paginate(10);
            return response()->json(['resumes' => $resumes]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения активных резюме'], 500);
        }
    }

    // Получение списка компаний
    public function getCompanies(Request $request)
    {
        try {
            $companies = Company::where('id', '>=', 0); // Используем пагинацию для компаний+
            if ($request->filled('query')) {
                $searchQuery = strtolower($request->input('query')); // Приведение запроса к нижнему регистру
                $companies->where(function($query) use ($searchQuery) {
                    $query->whereRaw('LOWER(name) like ?', ['%' . $searchQuery . '%']); // Приведение заголовка к нижнему регистру
                 });
            }
            $companies= $companies->paginate(10);
            return response()->json(['companies' => $companies]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения компаний'], 500);
        }
    }

    // Получение деталей компании
    public function getCompanyDetails($id)
    {
        try {
            $company = Company::with('user')->findOrFail($id);
            return response()->json($company);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка получения информации о компании'], 500);
        }
    }

    // Обновление информации о компании
    public function updateCompany(Request $request, Company $company)
    {
        try{
            $validated = $request->validate([
                //'user_id' => 'required|exists:users,id',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                //  'logo' => 'nullable|string|max:255',
                'website' => 'nullable|string|max:255',
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
//        try {
//            $company = Company::findOrFail($id);
//            $company->update($request->all());
//            return response()->json(['message' => 'Компания обновлена']);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Ошибка обновления компании'], 500);
//        }
    }

    // Удаление компании
    public function deleteCompany($id)
    {
        try {
            $company = Company::findOrFail($id);
            $company->delete();
            return response()->json(['message' => 'Компания удалена']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка удаления компании'], 500);
        }
    }

    // Одобрение вакансии
    public function approveJob($id)
    {
        try {
            $job = Job::findOrFail($id);
            $job->ad_status = 1;
            $job->save();
            return response()->json(['message' => 'Вакансия одобрена']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка при одобрении вакансии'], 500);
        }
    }
  public function reworkJob($id)
    {
         try {
            $job = Job::findOrFail($id);
            $job->ad_status = 2;
            $job->save();
            return response()->json(['message' => 'Вакансия на доработку']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка '], 500);
        }
    }

    // Отправка вакансии на доработку
    public function rejectJob($id)
    {
        try {
            $job = Job::findOrFail($id);
            $job->ad_status = 0; // Статус "требует доработки"
            $job->save();
            return response()->json(['message' => 'Вакансия отправлена на доработку']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка  '], 500);
        }
    }

    // Одобрение резюме
    public function approveResume($id)
    {
        try {
            $resume = Resume::findOrFail($id);
            $resume->ad_status = 1;
            $resume->save();
            return response()->json(['message' => 'Резюме одобрено']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка при одобрении резюме'], 500);
        }
    }
    public function reworkResume($id)
    {
        try {
            $resume = Resume::findOrFail($id);
            $resume->ad_status = 2;
            $resume->save();
            return response()->json(['message' => 'Резюме на доработку']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка при одобрении резюме'], 500);
        }
    }

    // Отправка резюме на доработку
    public function rejectResume($id)
    {
        try {
            $resume = Resume::findOrFail($id);
            $resume->ad_status = 0; // Статус "требует доработки"
            $resume->save();
            return response()->json(['message' => 'Резюме отправлено на доработку']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка при отправке на доработку'], 500);
        }
    }

    // Удаление вакансии
    public function deleteJob($id)
    {
        try {
            $job = Job::findOrFail($id);
            $job->delete();
            return response()->json(['message' => 'Вакансия удалена']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка при удалении вакансии'], 500);
        }
    }

    // Удаление резюме
    public function deleteResume($id)
    {
        try {
            $resume = Resume::findOrFail($id);
            $resume->delete();
            return response()->json(['message' => 'Резюме удалено']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ошибка при удалении резюме'], 500);
        }
    }
}

//
//
//namespace App\Http\Controllers;
//
//use App\Models\Job;
//use App\Models\Resume;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Log;
//
//class ModeratorController extends Controller
//{
//    public function index(Request $request)
//    {
//        try {
//            $searchQuery = $request->input('search');
//            $jobQuery = Job::where('ad_status', 2);
//            $resumeQuery = Resume::where('ad_status', 2);
//
//            // Поиск по ключевым словам (название вакансии и резюме)
//            if ($searchQuery) {
//                $jobQuery->where('title', 'like', '%' . $searchQuery . '%');
//                $resumeQuery->where('resume_name', 'like', '%' . $searchQuery . '%');
//            }
//
//            // Получаем вакансии и резюме с пагинацией
//            $jobs = $jobQuery->paginate(10);
//            $resumes = $resumeQuery->paginate(10);
//
//            return response()->json([
//                'jobs' => $jobs,
//                'resumes' => $resumes
//            ]);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Server error'], 500);
//        }
//    }
//
//    // Одобрение вакансии
//    public function approveJob($id)
//    {
//        try {
//            $job = Job::findOrFail($id);
//            $job->ad_status = 1; // Одобрено
//            $job->save();
//
//            return response()->json(['message' => 'Job approved']);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Error approving job'], 500);
//        }
//    }
//
//    // Одобрение резюме
//    public function approveResume($id)
//    {
//        try {
//            $resume = Resume::findOrFail($id);
//            $resume->ad_status = 1; // Одобрено
//            $resume->save();
//
//            return response()->json(['message' => 'Resume approved']);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Error approving resume'], 500);
//        }
//    }
//
//    // Удаление вакансии
//    public function deleteJob($id)
//    {
//        try {
//            $job = Job::findOrFail($id);
//            $job->delete();
//
//            return response()->json(['message' => 'Job deleted']);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Error deleting job'], 500);
//        }
//    }
//
//    // Удаление резюме
//    public function deleteResume($id)
//    {
//        try {
//            $resume = Resume::findOrFail($id);
//            $resume->delete();
//
//            return response()->json(['message' => 'Resume deleted']);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Error deleting resume'], 500);
//        }
//    }
//
//    // Получение деталей вакансии
//    public function showJob($id)
//    {
//        try {
//            $job = Job::with('location', 'category', 'skills')->findOrFail($id);
//            return response()->json($job);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Error fetching job details'], 500);
//        }
//    }
//
//    // Получение деталей резюме
//    public function showResume($id)
//    {
//        try {
//            $resume = Resume::with('location', 'category', 'skills')->findOrFail($id);
//            return response()->json($resume);
//        } catch (\Exception $e) {
//            Log::error($e->getMessage());
//            return response()->json(['error' => 'Error fetching resume details'], 500);
//        }
//    }
//}
//
////
////namespace App\Http\Controllers;
////
////use App\Models\Job;
////use App\Models\Resume;
////use Illuminate\Http\Request;
////use Illuminate\Support\Facades\Log;
////
////class ModeratorController extends Controller
////{
////    public function index()
////    {
////        try{
////            $jobs = Job::where('ad_status', 2)->paginate(10);
////            $resumes = Resume::where('ad_status', 2)->paginate(10);
////
////            return response()->json([
////                'jobs' => $jobs,
////                'resumes' => $resumes
////            ]);
////        }catch(\Exception $e){
////           Log::error($e->getMessage());
////            return response()->json(['error'=>'Server error'], 500);
////         }
////
////    }
////
////    public function approveJob($id)
////    {
////        $job = Job::findOrFail($id);
////        $job->ad_status = 1;
////        $job->save();
////
////        return response()->json(['message' => 'Job approved']);
////    }
////
////    public function approveResume($id)
////    {
////        $resume = Resume::findOrFail($id);
////        $resume->ad_status = 1;
////        $resume->save();
////
////        return response()->json(['message' => 'Resume approved']);
////    }
////
////    public function deleteJob($id)
////    {
////        $job = Job::findOrFail($id);
////        $job->delete();
////
////        return response()->json(['message' => 'Job deleted']);
////    }
////
////    public function deleteResume($id)
////    {
////        $resume = Resume::findOrFail($id);
////        $resume->delete();
////
////        return response()->json(['message' => 'Resume deleted']);
////    }
////}
