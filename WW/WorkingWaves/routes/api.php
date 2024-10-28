<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmploymentTypeController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\WorkScheduleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\JobViewController;
use App\Http\Controllers\ResumeViewController;
use App\Http\Controllers\CompanyRatingController;
use App\Http\Controllers\JobSeekerRatingController;
use App\Http\Controllers\LocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Маршрут для регистрации нового пользователя
//Route::post('/register', [RegisteredUserController::class, 'store'])
//    ->middleware('guest')
//    ->name('register');

// Маршрут для входа пользователя
Route::post('/login', [AuthController::class, 'login']);
//Маршрут регистрации
Route::post('/register', [AuthController::class, 'register']);
Route::get('/user/email-verify/{id}/{hash}', [UserController::class, 'verifyEmail'])
    ->middleware(['signed'])->name('verification.verify');
 Route::middleware('auth:sanctum')->get('/logout', [AuthController::class, 'logout']);


// Маршруты для личных кабинетов
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard/employer', [UserController::class, 'employerDashboard'])
        ->middleware('role:employer');

    Route::get('/dashboard/job_seeker', [UserController::class, 'seekerDashboard'])
        ->middleware('role:job_seeker');

    Route::get('/dashboard/admin', [UserController::class, 'adminDashboard'])
        ->middleware('role:admin');


});

// Для работы с резюме для job_seeker


Route::middleware(['auth:sanctum', 'role:job_seeker'])->get('/dashboard/job_seeker/resumes', [ResumeController::class, 'getResumes']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
//////////
//маршруты для администратора

Route::get('/admin/users/{id}', [AdminController::class, 'getUser']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function() {
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    Route::get('/admin/users/{id}/to_moder', [AdminController::class, 'makeModer']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

    Route::post('/admin/users/{id}', [AdminController::class, 'setUserToModer']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

    Route::get('/admin/categories', [AdminController::class, 'getCategories']);
    Route::post('/admin/categories/{id}/edit', [AdminController::class, 'editCategory']);
    Route::post('/admin/categories', [AdminController::class, 'createCategory']);
    Route::delete('/admin/categories/{id}', [AdminController::class, 'deleteCategory']);

    Route::get('/admin/locations', [AdminController::class, 'getLocations']);
    Route::post('/admin/locations/{id}/edit', [AdminController::class, 'editLocation']);
    Route::post('/admin/locations', [AdminController::class, 'createLocation']);
    Route::delete('/admin/locations/{id}', [AdminController::class, 'deleteLocation']);

    Route::get('/admin/stats', [StatsController::class, 'getStats']);
 });
///
//маршруты для модератора
Route::middleware(['auth:sanctum', 'role:moder'])->group(function () {
   Route::get('/dashboard/moderator', [ModeratorController::class, 'index']);
    Route::post('/moderator/jobs/{id}/approve', [ModeratorController::class, 'approveJob']);
    Route::post('/moderator/jobs/{id}/rework', [ModeratorController::class, 'reworkJob']);
    Route::delete('/moderator/jobs/{id}', [ModeratorController::class, 'deleteJob']);

    Route::post('/moderator/resumes/{id}/approve', [ModeratorController::class, 'approveResume']);
    Route::post('/moderator/resumes/{id}/rework', [ModeratorController::class, 'reworkResume']);
    Route::delete('/moderator/resumes/{id}', [ModeratorController::class, 'deleteResume']);

    // Непроверенные вакансии и резюме
    Route::get('/moderator/unverified-jobs', [ModeratorController::class, 'getUnverifiedJobs']);
    Route::get('/moderator/unverified-resumes', [ModeratorController::class, 'getUnverifiedResumes']);

    // Активные вакансии
    Route::get('/moderator/active-jobs', [ModeratorController::class, 'getActiveJobs']);
    Route::get('/moderator/active-resumes', [ModeratorController::class, 'getActiveResumes']);

    // Компании
    Route::get('/moderator/companies', [ModeratorController::class, 'getCompanies']);
    Route::get('/moderator/company/{id}', [ModeratorController::class, 'getCompanyDetails']);
    Route::put('/moderator/company/{company}', [ModeratorController::class, 'updateCompany']);
    Route::delete('/moderator/company/{id}', [ModeratorController::class, 'deleteCompany']);

    // Удаление вакансий и резюме
    Route::delete('/moderator/job/{id}', [ModeratorController::class, 'deleteJob']);
    Route::delete('/moderator/resume/{id}', [ModeratorController::class, 'deleteResume']);
});

Route::get('companies/{company}', [CompanyController::class, 'show'])->name('companies.show');
Route::middleware('auth:sanctum')->post('/companies/{company}/update', [CompanyController::class, 'update']);//для Компании редактировать данные пользоваткля вместе с данными компании(от пользователя только имя)
Route::middleware('auth:sanctum')->post('/user/{user}/update', [UserController::class, 'updateNameAndAvatar']);

Route::get('get_employer_count', [StatsController::class, 'getEmployerCount']);
Route::get('get_seeker_count', [StatsController::class, 'getSeekerCount']);
Route::get('get_active_job_count', [StatsController::class, 'getActiveJobCount']);
Route::get('get_active_resume_count', [StatsController::class, 'getActiveResumeCount']);
Route::get('get_job_to_check_count', [StatsController::class, 'getJobToCheckCount']);
Route::get('get_resume_to_check_count', [StatsController::class, 'getResumeToCheckCount']);

Route::get('resumes', [ResumeController::class, 'index']);

Route::middleware('auth:sanctum')->get('/personal_resumes', [ResumeController::class, 'getPersonalResumes']);
Route::middleware('auth:sanctum')->post('/create_resume', [ResumeController::class, 'store']);
Route::middleware('auth:sanctum')->post('/resumes/{resumes}/update', [ResumeController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/resumes/{id}', [ResumeController::class, 'destroy']);



Route::get('resumes/{resumes}', [ResumeController::class, 'show'])->name('resumes.show');
Route::patch('resumes/{resumes}', [ResumeController::class, 'update'])->name('resumes.patch');
Route::get('resumes/search', [ResumeController::class, 'search'])->name('resumes.search');


Route::middleware('auth:sanctum')->get('/personal_jobs', [JobController::class, 'getPersonalJobs']);
Route::middleware('auth:sanctum')->post('/create_job', [JobController::class, 'store']);
Route::middleware('auth:sanctum')->post('/job/{jobs}/update', [JobController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/jobs/{id}', [JobController::class, 'destroy']);

Route::get('jobs', [JobController::class, 'index']);

Route::get('jobs/{job}', [JobController::class, 'show'])->name('jobs.show');



Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories', [CategoryController::class, 'store']);
Route::get('categories/{category}', [CategoryController::class, 'show']);
Route::put('categories/{category}', [CategoryController::class, 'update']);
Route::patch('categories/{category}', [CategoryController::class, 'update']);
Route::delete('categories/{category}', [CategoryController::class, 'destroy']);


Route::get('locations', [LocationController::class, 'index']);
Route::get('/employment_type', [EmploymentTypeController::class, 'index']);
Route::get('/work_schedule', [WorkScheduleController::class, 'index']);



Route::get('skills', [SkillController::class, 'index'])->name('skills.index');
Route::post('skills', [SkillController::class, 'store'])->name('skills.store');
Route::get('skills/{skill}', [SkillController::class, 'show'])->name('skills.show');
Route::put('skills/{skill}', [SkillController::class, 'update'])->name('skills.update');
Route::patch('skills/{skill}', [SkillController::class, 'update'])->name('skills.patch');
Route::delete('skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy');
